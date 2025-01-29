import { prisma } from "@/server/db/client";
import { Question, QuestionDifficulty, Topic } from "@prisma/client";
import { CustomMath } from "./CustomMath";

// TODO: Add more logic checks to ensure that the recommended question is suitable
export const RecommendQuestion = async (
  courseSlug: string,
  masteryLevel: number
) => {
  const relevantTopics = await prisma.course.findFirst({
    where: {
      courseSlug: courseSlug,
    },
    select: {
      topics: {
        select: {
          topicSlug: true,
          topicName: true,
          topicPrior: true,
          questions: {
            select: {
              questionDifficulty: true,
            },
          },
        },
      },
    },
  });

  if (!relevantTopics) {
    throw new Error("Invalid course slug or course has no relevant topics");
  }

  // Filter topics that have at least one question
  const activeTopics = relevantTopics.topics.filter(
    (topic) => topic.questions.length > 0
  );

  if (activeTopics.length === 0) {
    throw new Error("No questions available in any topic for this course");
  }

  const recommendedTopic = CustomMath.nRandomItems(1, activeTopics)[0] as Topic;

  console.log(
    `[${courseSlug}] RECOMMENDED TOPIC: `,
    recommendedTopic.topicSlug
  );

  const getDifficultyLevel = (mastery: number, topicPrior: number): QuestionDifficulty => {
    if (mastery <= topicPrior) return QuestionDifficulty.Easy;
    if (mastery <= 0.66697) return QuestionDifficulty.Medium;
    return QuestionDifficulty.Hard;
  };

  console.log(masteryLevel);

  console.log(getDifficultyLevel(masteryLevel, recommendedTopic.topicPrior));

  const initialDifficulty = getDifficultyLevel(masteryLevel, recommendedTopic.topicPrior);
  console.log(initialDifficulty);

  // Define fallback order based on initial difficulty
  const fallbackOrder: Record<QuestionDifficulty, QuestionDifficulty[]> = {
    [QuestionDifficulty.Easy]: [
      QuestionDifficulty.Easy,
      QuestionDifficulty.Medium,
      QuestionDifficulty.Hard,
    ],
    [QuestionDifficulty.Medium]: [
      QuestionDifficulty.Medium,
      QuestionDifficulty.Easy,
      QuestionDifficulty.Hard,
    ],
    [QuestionDifficulty.Hard]: [
      QuestionDifficulty.Hard,
      QuestionDifficulty.Medium,
      QuestionDifficulty.Easy,
    ],
  };

  // Try to find questions using the fallback order
  let recommendedQuestion: Question | null = null;
  for (const difficulty of fallbackOrder[initialDifficulty]) {
    const questions = await prisma.question.findMany({
      where: {
        topicSlug: recommendedTopic.topicSlug,
        questionDifficulty: difficulty,
      },
    });

    if (questions.length > 0) {
      recommendedQuestion = CustomMath.nRandomItems(1, questions)[0] as Question;
      if (difficulty !== initialDifficulty) {
        console.warn(
          `[${recommendedTopic.topicSlug}] No questions with difficulty ${initialDifficulty}, fell back to ${difficulty}`
        );
      }
      break;
    }
  }

  if (!recommendedQuestion) {
    console.warn(
      `[${recommendedTopic.topicSlug}] No questions found in topic, searching other topics...`
    );

    const alternativeQuestions = await prisma.question.findMany({
      where: {
        topic: {
          courses: {
            some: {
              courseSlug,
            },
          },
        },
        questionDifficulty: initialDifficulty,
      },
      include: {
        topic: {
          select: {
            topicName: true,
            topicSlug: true,
          },
        },
      },
    });

    if (alternativeQuestions.length > 0) {
      const selectedQuestion = CustomMath.nRandomItems(1, alternativeQuestions)[0] as Question & {
        topic: { topicName: string; topicSlug: string };
      };
      recommendedQuestion = selectedQuestion;
      console.log(
        `[${courseSlug}] Found alternative question in topic: ${selectedQuestion.topic.topicSlug}`
      );
      return {
        recommendedTopicSlug: selectedQuestion.topic.topicSlug,
        recommendedTopicName: selectedQuestion.topic.topicName,
        recommendedQuestion: selectedQuestion,
      };
    }
  }

  if (!recommendedQuestion) {
    throw new Error(
      "No suitable questions found in any topic. Please contact your instructor."
    );
  }

  return {
    recommendedTopicSlug: recommendedTopic.topicSlug,
    recommendedTopicName: recommendedTopic.topicName,
    recommendedQuestion,
  };
};