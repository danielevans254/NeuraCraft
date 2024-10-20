import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const isEmailAllowed = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        isNewUser: true,
      },
    });

    res.status(200).json({
      customToast: true,
      emailAllowed: isEmailAllowed !== null,
      isNewUser: isEmailAllowed?.isNewUser,
    });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'An error occurred while checking the email' });
  }
}