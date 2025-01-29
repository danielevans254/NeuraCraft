import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import { QuestionDifficulty } from "@prisma/client";

interface MasteryResponse {
  topicName: string;
  topicSlug: string;
  masteryLevel: number;
  streakCorrect: number;
  streakIncorrect: number;
  lastDifficulty: QuestionDifficulty | null;
  period: string;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MasteryResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { student_id, topic_slug } = req.query;

    if (!student_id || !topic_slug) {
      return res.status(400).json({
        message: "Missing required parameters: student_id and topic_slug"
      });
    }

    const period = typeof req.query.period === 'string' ? req.query.period : 'current';

    if (!['current', 'week', 'fortnight'].includes(period)) {
      return res.status(400).json({
        message: "Invalid period. Must be 'current', 'week', or 'fortnight'"
      });
    }

    // Get both user and mastery data in parallel
    const [userData, masteryData] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: student_id as string
        },
        select: {
          streakCorrect: true,
          streakIncorrect: true,
          lastDifficulty: true,
        }
      }),
      prisma.mastery.findFirst({
        where: {
          userId: student_id as string,
          topicSlug: topic_slug as string
        },
        select: {
          masteryLevel: period === "current",
          weeklyMasteryLevel: period === "week",
          fortnightlyMasteryLevel: period === "fortnight",
          topic: {
            select: {
              topicName: true,
              topicSlug: true
            }
          }
        }
      })
    ]);

    if (!masteryData) {
      return res.status(404).json({
        message: `No mastery record found for topic ${topic_slug} and student ${student_id}`
      });
    }

    if (!userData) {
      return res.status(404).json({
        message: `User ${student_id} not found`
      });
    }

    const masteryValue =
      period === "current" ? masteryData.masteryLevel :
        period === "week" ? masteryData.weeklyMasteryLevel :
          masteryData.fortnightlyMasteryLevel;

    const response: MasteryResponse = {
      topicSlug: masteryData.topic.topicSlug,
      topicName: masteryData.topic.topicName,
      masteryLevel: Math.round((masteryValue || 0) * 10000) / 100,
      period,
      streakCorrect: userData.streakCorrect,
      streakIncorrect: userData.streakIncorrect,
      lastDifficulty: userData.lastDifficulty
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('Error in getMastery API:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
}