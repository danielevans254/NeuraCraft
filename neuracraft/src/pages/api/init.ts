import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // GET request to check if the user has already consented
  if (req.method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
      select: {
        name: true,
        ceuId: true,
        consentDate: true,
        isNewUser: true,
      },
    });

    res.status(200).json(user);
  }

  // POST request to add consented info from user
  if (req.method === "POST") {
    const {
      name,
      ceuId,
    }: {
      name?: string;
      ceuId?: string;
    } = req.body;

    if (!name || !ceuId) {
      // User chooses to remain anonymous
      await prisma.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          isNewUser: false,
        },
      });
    } else {
      // User consents to share their info
      if (!(name.length > 0 && ceuId.length === 9)) {
        res.status(400).json({ message: "Missing name or ceuId" });
      }

      await prisma.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          name,
          ceuId,
          consentDate: new Date(),
          isNewUser: false,
        },
      });
    }

    res.status(200).json({ message: "Welcome to NeuraCraft!" });
  }
}
