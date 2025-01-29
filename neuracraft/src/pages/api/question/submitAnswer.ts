import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/server/db/client";
import { QuestionDataType } from "@/types/question-types";
import { CustomEval } from "@/utils/CustomEval";
import { CustomMath } from "@/utils/CustomMath";
import { RecommendQuestion } from "@/utils/Recommender";
import { QuestionDifficulty } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*
  Submit Answer Flow
  1. Update the BKT model and get user's new mastery
  2. Recommended question
    a. Topic: random topic tested in current course
    b. Difficulty: according to new mastery level
  3. Add a new questionWithAddedTime with runtime generated answer options
  4. Add a new attempt
  5. Update the user's streak and last difficulty
  6. Return the new mastery to fire a custom notification
  */

  const session = await getServerSession(req, res, authOptions);

  try {
    const { qatId, courseSlug } = z
      .object({
        qatId: z.string(),
        courseSlug: z.string(),
      })
      .parse(req.query);

    const { attemptedKeys, isCorrect, topicSlug, topicName, difficulty, streakCorrect, streakIncorrect } = z
      .object({
        attemptedKeys: z.array(z.string()),
        isCorrect: z.boolean(),
        topicSlug: z.string(),
        topicName: z.string(),
        difficulty: z.enum(["Easy", "Medium", "Hard"]),
        streakCorrect: z.number(),
        streakIncorrect: z.number()
      })
      .parse(req.body);

    // Step 1: Update the BKT model and get user's new mastery
    const { data: pybktUpdate } = await axios.patch<{
      Updated: boolean;
    }>(
      `${process.env.RECOMMENDER_URL}/update-state/${session?.user?.id
      }/${topicSlug}/${isCorrect ? "1" : "0"}`,
      req,
      {
        headers: {
          Accept: "application/json",
          access_token: process.env.RECOMMENDER_API_KEY,
        },
      }
    );

    if (!pybktUpdate || !pybktUpdate.Updated) {
      throw new Error("PyBKT API update unsuccessful");
    }

    const { data: pybktGet } = await axios.get<{ Mastery: number }>(
      `${process.env.RECOMMENDER_URL}/get-mastery/${session?.user?.id}/${topicSlug}`,
      {
        headers: {
          Accept: "application/json",
          access_token: process.env.RECOMMENDER_API_KEY,
        },
      }
    );

    if (!pybktGet || !pybktGet.Mastery) {
      throw new Error("PyBKT API get unsuccessful");
    }

    console.log(
      `[${topicSlug}] NEW MASTERY: ${(pybktGet.Mastery * 100).toFixed(2)}%`
    );

    // Step 2: Recommend a new question
    const { recommendedTopicSlug, recommendedQuestion } =
      await RecommendQuestion(courseSlug, pybktGet.Mastery);

    console.log(
      `[${recommendedTopicSlug}] RECOMMENDED QUESTION: `,
      recommendedQuestion.questionId
    );

    // Step 3: Add a new questionWithAddedTime with runtime generated answer options
    const questionData = recommendedQuestion.questionData as QuestionDataType;

    // Only evaluate variables and methods if dynamic question
    let evaluatedQuestionData;
    if (recommendedQuestion.variationId === 0) {
      evaluatedQuestionData = CustomEval(
        questionData.variables,
        questionData.methods
      );
    }

    await prisma.questionWithAddedTime.create({
      data: {
        userId: session?.user?.id as string,
        courseSlug: courseSlug,
        questionId: recommendedQuestion.questionId,
        variationId: recommendedQuestion.variationId,
        variables:
          evaluatedQuestionData?.questionVariables ?? questionData.variables,
        answers: CustomMath.shuffleArray(
          questionData.answers ?? evaluatedQuestionData?.questionAnswers
        ) as QuestionDataType["answers"],
      },
    });

    // Step 4: Add a new attempt
    await prisma.attempt.create({
      data: {
        userId: session?.user?.id as string,
        courseSlug: courseSlug,
        qatId: qatId,
        attemptedKeys: attemptedKeys,
        isCorrect: isCorrect,
      },
    });

    await prisma.user.update({
      where: { id: session?.user?.id as string },
      data: {
        streakCorrect: isCorrect ? streakCorrect + 1 : 0,
        streakIncorrect: isCorrect ? 0 : streakIncorrect + 1,
        lastDifficulty: difficulty,
      },
    });

    // Step 6: Return the new mastery to fire a custom notification
    res.status(200).json({
      customToast: true,
      message: "Answer submitted successfully",
      topic: topicName,
      masteryLevel: pybktGet.Mastery,
      isCorrect: isCorrect,
      courseSlug: courseSlug,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message:
        e instanceof z.ZodError || e instanceof AxiosError || e instanceof Error
          ? e.message
          : "Failed to submit answer due to unknown error",
    });
  }
}