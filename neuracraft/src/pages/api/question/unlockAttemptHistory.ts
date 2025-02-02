import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request:", req.method, req.body);

  if (req.method !== 'POST') {
    console.log("Invalid request method:", req.method);
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const { userId, topicSlug } = req.body;
  console.log("Request body:", { userId, topicSlug });

  try {
    // Delete any existing locks for this user/topic
    const deleteResult = await prisma.attemptHistoryLock.deleteMany({
      where: {
        userId,
        topicSlug,
      }
    });
    console.log("Delete result:", deleteResult);

    return res.status(200).json({
      success: true,
      message: "Locks successfully removed"
    });

  } catch (error) {
    console.error("Error unlocking attempt history:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to unlock history"
    });
  }
}