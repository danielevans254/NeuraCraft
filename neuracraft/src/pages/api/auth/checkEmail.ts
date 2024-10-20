// pages/api/check-email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    res.status(200).json({ valid: true });
  } else {
    res.status(404).json({ valid: false });
  }
}
