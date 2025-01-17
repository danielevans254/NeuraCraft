import { PrismaClient, Prisma } from "@prisma/client";
import { Courses, Questions, Topics, users } from "./seed_data";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
  const tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME != '_prisma_migrations'
  `;
  for (const { TABLE_NAME } of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${TABLE_NAME}\``);
  }
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
}

async function main() {
  await clearDatabase();
  console.log("Database cleared");

  await prisma.topic.createMany({ data: Topics });
  console.log("Topics created");

  for (const questionData of Questions) {
    const count = await prisma.question.count({
      where: { topicSlug: questionData.topicSlug },
    });
    const uniqueTitle = `${questionData.topicSlug}-Q${count + 1}`;

    await prisma.question.create({
      data: {
        ...questionData,
        questionTitle: uniqueTitle,
      },
    });
  }
  console.log("Questions created");

  for (const course of Courses) {
    const { topics, courseMedia, ...courseData } = course;
    const createdCourse = await prisma.course.create({ data: courseData });

    if (topics && topics.length > 0) {
      await prisma.course.update({
        where: { courseSlug: createdCourse.courseSlug },
        data: {
          topics: {
            connect: topics.map((topic: any) => ({ topicSlug: topic })),
          },
        },
      });
    }

    if (courseMedia && courseMedia.length > 0) {
      await prisma.courseMedia.createMany({
        data: courseMedia.map((media: any) => ({
          ...media,
          courseSlug: createdCourse.courseSlug,
        })),
      });
    }
  }
  console.log("Courses and related data created");

  for (const userData of users) {
    const user = await prisma.user.create({ data: userData });
    console.log(`Created user: ${user.email}`);
    await prisma.account.create({
      data: {
        userId: user.id,
        type: "oauth",
        provider: "google",
        providerAccountId: `google-${user.id}`,
        access_token: "mock-access-token",
        expires_at: 1234567890,
        token_type: "Bearer",
        scope: "openid profile email",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
