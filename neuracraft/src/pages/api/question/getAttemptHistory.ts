import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, topicSlug } = req.query;

  try {
    const lock = await prisma.attemptHistoryLock.findFirst({
      where: {
        userId: userId as string,
        topicSlug: topicSlug as string,
        lockedUntil: { gt: new Date() },
      },
    });

    if (!lock) {
      await prisma.attemptHistoryLock.deleteMany({
        where: {
          userId: userId as string,
          topicSlug: topicSlug as string,
          lockedUntil: { lte: new Date() },
        },
      });
    }

    res.status(200).json({
      locked: !!lock,
      lockedUntil: lock?.lockedUntil || null,
      attempts: []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attempt history" });
  }
}