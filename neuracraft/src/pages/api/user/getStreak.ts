import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/server/db/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        streakCorrect: true,
        streakIncorrect: true,
        lastDifficulty: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      streakCorrect: user.streakCorrect,
      streakIncorrect: user.streakIncorrect,
      lastDifficulty: user.lastDifficulty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch streak data" });
  }
}