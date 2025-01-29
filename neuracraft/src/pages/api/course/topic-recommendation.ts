import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/server/db/client';
import { z } from 'zod';
import stringSimilarity from 'string-similarity';

const querySchema = z.object({
  courseSlug: z.string().min(1),
});

interface RecommendationResponse {
  recommendationUrl?: string;
  message: string;
  recommendedTopic?: string;
  currentMastery?: number;
  previousPeakMastery?: number;
  confidenceScore?: number;
  alternatives?: string[];
  mediaType?: 'PDF' | 'video' | 'quiz';
  reason?: string;
  pageNumber?: number;
}

// TODO: When giving the url, i need to make it more relevant to the question, topic the user is struggling with, im thinking making the use of RAG, I will take all the pdfs from the current course the user is taking, and then compare the pdf name with the topic the user is struggling with, if the similarity is above 0.6, then i will recommend that pdf to the user, if not, then i will recommend the first pdf in the course, if there are no pdfs in the course, then i will recommend the first video in the course, if there are no videos in the course, then i will recommend the first quiz in the course, if there are no quizzes in the course, then i will recommend the first pdf in the course, etc. and i will need to go to the exact page the user needs to read or video, etc

function generateResourceUrl(params: {
  courseSlug: string;
  mediaIndex?: number;
  pageNumber?: number;
}): string {
  const { courseSlug, mediaIndex = 0, pageNumber = 1 } = params;
  return `http://localhost:3000/courses/${courseSlug}?section=learn&tab=lecture-slides&pdfIndex=${mediaIndex}&page=${pageNumber}`;
}

function normalizeString(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractPageNumber(mediaName: string): number | undefined {
  const pageMatch = mediaName.match(/#page=(\d+)/);
  return pageMatch ? parseInt(pageMatch[1], 10) : undefined;
}

function calculateTrendSignificance(history: { masteryLevel: number }[]): number {
  if (history.length < 2) return 0;

  const masteryLevels = history.map(h => h.masteryLevel);
  const recentChanges = [];
  for (let i = 1; i < masteryLevels.length; i++) {
    recentChanges.push(masteryLevels[i] - masteryLevels[i - 1]);
  }

  const averageChange = recentChanges.reduce((sum, val) => sum + val, 0) / recentChanges.length;
  return averageChange < 0 ? Math.abs(averageChange) : 0;
}

function calculatePriorityScore(
  mastery: {
    current: number;
    peak: number;
    trend: number;
    errorMeter: number;
    topic: { courses: any[] };
  },
  attempts: { streak: number; recentAccuracy: number; total: number }
) {
  const safePeak = mastery.peak || 1;
  const masteryDrop = Math.min(1, (safePeak - mastery.current) / safePeak);
  const errorWeight = Math.min(1, mastery.errorMeter / 15);
  const streakWeight = Math.min(1, attempts.streak / 3);
  const dependencyWeight = mastery.topic.courses.length > 0 ? 0.5 : 0;
  const trendWeight = Math.min(1, mastery.trend * 2);

  return (
    masteryDrop * 0.4 +
    errorWeight * 0.25 +
    streakWeight * 0.15 +
    trendWeight * 0.15 +
    dependencyWeight * 0.05
  );
}

function generateReason(recommendation: any) {
  const reasons = [];
  if (recommendation.score > 0.7) reasons.push('significant mastery drop');
  if (recommendation.streak >= 2) reasons.push('recent incorrect streak');
  if (recommendation.errorMeter > 5) reasons.push('high error frequency');
  if (recommendation.trend > 0.3) reasons.push('consistent downward trend');
  return reasons.join(', ') || 'proactive learning suggestion';
}

function mediaSimilarity(mediaName: string, topicSlug: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return stringSimilarity.compareTwoStrings(
    normalize(mediaName),
    normalize(topicSlug)
  );
}

async function handleNoMediaFound(
  course: NonNullable<Awaited<ReturnType<typeof prisma.course.findUnique>>>,
  masteries: Awaited<ReturnType<typeof prisma.mastery.findMany>>,
  res: NextApiResponse<RecommendationResponse>
) {
  const masteredTopics = new Set(masteries.map(m => m.topicSlug));
  const nextTopic = course.topics.find(t =>
    !masteredTopics.has(t.topicSlug) &&
    course.courseMedia.some(m => mediaSimilarity(m.mediaName, t.topicSlug))
  );

  if (nextTopic) {
    const media = course.courseMedia.find(m =>
      mediaSimilarity(m.mediaName, nextTopic.topicSlug)
    );
    const mediaIndex = course.courseMedia.findIndex(m => m.publicId === media?.publicId);
    const pageNumber = extractPageNumber(media?.mediaName || '');

    return res.json({
      message: 'Starting with foundational topic',
      recommendedTopic: nextTopic.topicSlug,
      recommendationUrl: generateResourceUrl({
        courseSlug: course.courseSlug,
        mediaIndex: Math.max(0, mediaIndex),
        pageNumber: pageNumber || 1
      })
    });
  }

  return res.json({
    message: 'All course materials reviewed',
    recommendationUrl: `http://localhost:3000/courses/${course.courseSlug}/completion`
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecommendationResponse>
) {
  console.log('Request received:', req.query);

  const session = await getServerSession(req, res, authOptions);
  console.log('Session:', session);

  if (!session?.user?.id) {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const validation = querySchema.safeParse(req.query);
  if (!validation.success) {
    console.log('Validation failed:', validation.error.errors);
    return res.status(400).json({
      message: `Invalid request: ${validation.error.errors[0]?.message}`,
    });
  }
  const { courseSlug } = validation.data;
  console.log('Course slug:', courseSlug);

  try {
    const [course, masteries, attempts, locks] = await Promise.all([
      prisma.course.findUnique({
        where: { courseSlug },
        include: {
          topics: {
            select: {
              topicSlug: true,
              topicPrior: true,
              courses: true
            }
          },
          courseMedia: true
        }
      }),
      prisma.mastery.findMany({
        where: { userId: session.user.id },
        include: {
          history: {
            orderBy: { timestamp: 'desc' },
            take: 10,
            select: { masteryLevel: true }
          },
          topic: {
            include: { courses: true }
          }
        }
      }),
      prisma.attempt.findMany({
        where: {
          userId: session.user.id,
          submittedAt: { gt: new Date(Date.now() - 7 * 864e5) }
        },
        include: {
          questionWithAddedTime: {
            include: {
              question: {
                include: {
                  topic: { select: { topicSlug: true } }
                }
              }
            }
          }
        }
      }),
      prisma.attemptHistoryLock.findMany({
        where: { userId: session.user.id }
      })
    ]);

    console.log('Course:', course);
    console.log('Masteries:', masteries);
    console.log('Attempts:', attempts);
    console.log('Locks:', locks);

    if (!course) {
      console.log('Course not found');
      return res.status(404).json({ message: 'Course not found' });
    }

    const masteryAnalysis = masteries.map(m => {
      const history = m.history;
      const peak = Math.max(...history.map(h => h.masteryLevel), m.masteryLevel);
      const trend = calculateTrendSignificance(history);

      return {
        topicSlug: m.topicSlug,
        current: m.masteryLevel,
        peak,
        trend,
        errorMeter: m.errorMeter,
        topic: m.topic,
        isLocked: locks.some(l => l.topicSlug === m.topicSlug && l.lockedUntil > new Date())
      };
    });

    console.log('Mastery analysis:', masteryAnalysis);

    const attemptAnalysis = attempts.reduce((acc, attempt) => {
      const topicSlug = attempt.questionWithAddedTime.question.topic.topicSlug;
      if (!acc[topicSlug]) {
        acc[topicSlug] = {
          correct: 0,
          total: 0,
          streak: 0,
          recentAccuracy: 0
        };
      }

      acc[topicSlug].total++;
      acc[topicSlug].correct += attempt.isCorrect ? 1 : 0;
      acc[topicSlug].streak = attempt.isCorrect ? 0 : acc[topicSlug].streak + 1;

      const hoursSinceAttempt = (Date.now() - attempt.submittedAt.getTime()) / 3600000;
      const weight = Math.max(0, 1 - (hoursSinceAttempt / 168));
      acc[topicSlug].recentAccuracy += (attempt.isCorrect ? 1 : 0) * weight;

      return acc;
    }, {} as Record<string, { correct: number; total: number; streak: number; recentAccuracy: number }>);

    console.log('Attempt analysis:', attemptAnalysis);

    const recommendations = masteryAnalysis
      .filter(t => !t.isLocked)
      .map(t => {
        const attemptsData = attemptAnalysis[t.topicSlug] || {
          streak: 0,
          recentAccuracy: 0,
          total: 0,
          correct: 0
        };

        return {
          ...t,
          ...attemptsData,
          score: calculatePriorityScore(t, attemptsData)
        };
      })
      .sort((a, b) => b.score - a.score);

    console.log('Recommendations:', recommendations);

    const mediaMatches = recommendations.flatMap(recommendation => {
      return course.courseMedia
        .filter(media => {
          const similarity = stringSimilarity.compareTwoStrings(
            normalizeString(media.mediaName),
            normalizeString(recommendation.topicSlug)
          );
          return similarity >= 0.6;
        })
        .map(media => ({
          ...recommendation,
          media,
          pageNumber: extractPageNumber(media.mediaName)
        }));
    });

    console.log('Media matches:', mediaMatches);

    if (mediaMatches.length === 0) {
      console.log('No media matches found');
      return handleNoMediaFound(course, masteries, res);
    }

    const primaryRecommendation = mediaMatches[0];
    const mediaIndex = course.courseMedia.findIndex(m => m.publicId === primaryRecommendation?.media.publicId);

    const recommendationUrl = generateResourceUrl({
      courseSlug,
      mediaIndex,
      pageNumber: primaryRecommendation?.pageNumber
    });

    console.log('Primary recommendation:', primaryRecommendation);
    console.log('Recommendation URL:', recommendationUrl);

    return res.json({
      recommendationUrl,
      message: 'Recommended resource based on your learning patterns',
      recommendedTopic: primaryRecommendation?.topicSlug,
      currentMastery: primaryRecommendation?.current,
      previousPeakMastery: primaryRecommendation?.peak,
      confidenceScore: primaryRecommendation?.score,
      mediaType: 'PDF',
      alternatives: mediaMatches.slice(1, 3).map(m => m.topicSlug),
      reason: generateReason(primaryRecommendation),
      pageNumber: primaryRecommendation?.pageNumber
    });

  } catch (error) {
    console.error('Recommendation error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}