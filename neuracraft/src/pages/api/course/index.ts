import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/db/client";

export async function getAllCoursesData() {
  return await prisma.course.findMany({
    include: {
      topics: true,
      courseMedia: true,
    },
    orderBy: [
      {
        week: "asc",
      },
      {
        studio: "asc",
      },
    ],
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API request received");
  const courses = await getAllCoursesData();
  res.status(200).json(courses);
}

