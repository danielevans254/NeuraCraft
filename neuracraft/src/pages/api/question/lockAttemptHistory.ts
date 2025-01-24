import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, topicSlug } = req.body;

  try {
    await prisma.attemptHistoryLock.deleteMany({
      where: { userId, topicSlug }
    });

    const lockedUntil = new Date(Date.now() + 5 * 60 * 1000);
    const lock = await prisma.attemptHistoryLock.create({
      data: {
        userId,
        topicSlug,
        lockedUntil,
      },
    });

    setTimeout(async () => {
      try {
        await prisma.attemptHistoryLock.delete({
          where: { id: lock.id }
        });
      } catch (error) {
        console.error("Failed to auto-delete lock:", error);
      }
    }, 5 * 60 * 1000); // 5 minutes

    res.status(200).json({
      success: true,
      lockedUntil: lockedUntil.toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to lock attempt history"
    });
  }
}