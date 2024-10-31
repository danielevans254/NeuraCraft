import { PrismaClient, Prisma } from "@prisma/client";
import {
  Courses,
  Questions,
  Topics,
  users,
  // samplePosts,
  // sampleComments
} from "./seed_data";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Disable foreign key checks
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;

  // Get all table names
  const tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME != '_prisma_migrations'
  `;

  // Truncate all tables
  for (const { TABLE_NAME } of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${TABLE_NAME}\``);
  }

  // Re-enable foreign key checks
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
}

async function main() {
  await clearDatabase();
  console.log("Database cleared");

  await prisma.topic.createMany({ data: Topics });
  console.log("Topics created");

  await prisma.question.createMany({ data: Questions });
  console.log("Questions created");

  for (const course of Courses) {
    const { topics, courseMedia, ...courseData } = course;

    const createdCourse = await prisma.course.create({
      data: courseData,
    });

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

  // // Create sample posts and comments
  // for (const postData of samplePosts) {
  //   const post = await prisma.post.create({
  //     data: postData,
  //   });

  //   // Create associated comments
  //   const postComments = sampleComments.filter((comment: { postId: string; }) => comment.postId === post.postId);
  //   if (postComments.length > 0) {
  //     await prisma.comment.createMany({
  //       data: postComments,
  //     });
  //   }
  // }

  // console.log("Sample posts and comments created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });