import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questions = await prisma.question.findMany({
    include: {
      topic: false,
      questionsWithAddedTime: {
        include: {
          attempts: true,
        },
      },
    },
  });
  console.log(questions)
  res.status(200).json(questions);
}
