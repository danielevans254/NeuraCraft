import axios from "axios";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Dots from "@/components/misc/Dots";
import Navbar from "@/components/Navbar";
import { Carousel } from "@mantine/carousel";
import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Course, CourseMedia, CourseType, Level, Topic } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type CourseWithMediaAndTopicType = Course & {
  courseMedia: CourseMedia[];
  topics: Topic[];
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows.md,
    },
  },
  sectionTitle: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -8,
      left: 0,
      width: 48,
      height: 2,
      backgroundColor: theme.colors.blue[6],
    },
  },
  imageContainer: {
    position: 'relative',
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backdropFilter: 'blur(4px)',
    backgroundColor: theme.fn.rgba(
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      0.7
    ),
  },
}));

type BadgeCardProps = {
  slug: string;
  image: string;
  title: string;
  category: string;
  description: string;
  badges: string[];
};

export default function CoursesPage() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  function BadgeCard({ slug, image, title, category, description, badges }: BadgeCardProps) {
    return (
      <Card
        radius="md"
        p="lg"
        className={classes.card}
        component={Link}
        href={`/courses/${slug}`}
      >
        <Card.Section>
          <div className={classes.imageContainer} style={{ backgroundImage: `url(${image})` }}>
            <Badge
              className={classes.categoryBadge}
              size="sm"
              variant="gradient"
              gradient={{
                from: theme.colorScheme === 'dark' ? 'teal' : 'blue',
                to: theme.colorScheme === 'dark' ? 'cyan' : 'indigo',
                deg: 35
              }}
              sx={{
                color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.white,
                fontWeight: 700,
                letterSpacing: 0.5
              }}
            >
              {category}
            </Badge>
          </div>
        </Card.Section>

        <Text weight={700} size="lg" mt="sm" lineClamp={1}>
          {title}
        </Text>

        <Text size="sm" lineClamp={2} mt={4}>
          {description}
        </Text>

        <Group spacing={4} mt="md">
          <Text size="xs" weight={500} transform="uppercase">
            Topics covered:
          </Text>
          {badges.map((badge) => (
            <Badge
              key={badge}
              variant="filled"
              color={theme.colorScheme === 'dark' ? 'orange' : 'violet'}
              size="sm"
              radius="sm"
              sx={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? theme.fn.rgba(theme.colors.orange[5], 0.2)
                  : theme.fn.rgba(theme.colors.violet[0], 0.9),
                color: theme.colorScheme === 'dark'
                  ? theme.colors.orange[2]
                  : theme.colors.violet[7],
                border: `1px solid ${theme.colorScheme === 'dark'
                  ? theme.colors.orange[4]
                  : theme.colors.violet[3]
                  }`,
              }}
            >
              {badge}
            </Badge>
          ))}
        </Group>
      </Card>
    );
  }

  function CarouselWrapper({ children }: { children: React.ReactNode }) {
    return (
      <Carousel
        slideSize="30%"
        breakpoints={[
          { maxWidth: 'xl', slideSize: '33%' },
          { maxWidth: 'lg', slideSize: '50%' },
          { maxWidth: 'md', slideSize: '50%', slideGap: 'sm' },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        ]}
        slideGap="lg"
        align="start"
        controlsOffset="xs"
        controlSize={32}
        loop
        withIndicators
        styles={{
          control: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7],
          },
        }}
      >
        {children}
      </Carousel>
    );
  }

  const { data: courses } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => axios.get<CourseWithMediaAndTopicType[]>("/api/course"),
  });

  if (!courses) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader variant="dots" size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Header title="All Courses" />
      <Navbar />

      <Box pos="relative" py={80}>
        <Dots
          dotPositions={[
            { left: 0, top: 0 },
            { left: 120, top: 20 },
            { right: 20, top: 60 },
            { right: 60, top: 200 },
          ]}
        />

        <Container size="xl">
          <Title
            order={1}
            align="center"
            mb={40}
            className={classes.sectionTitle}
          >
            Explore Our Courses
          </Title>

          {courses.data.length === 0 || courses.data.every(course => !course.isPublished) ? (
            <Box py={40} textAlign="center">
              <Text size="xl" color="dimmed">
                No published courses available at the moment.
              </Text>
            </Box>
          ) : (
            [
              { title: "Skill Assessments", type: CourseType.Quiz },
              { title: "Fundamental Concepts", type: CourseType.Content, level: Level.Foundational },
              { title: "Intermediate Studies", type: CourseType.Content, level: Level.Intermediate },
              { title: "Advanced Topics", type: CourseType.Content, level: Level.Advanced }
            ].map((section, index) => {
              const filteredCourses = courses.data.filter((course) =>
                course.isPublished &&
                (section.type === CourseType.Quiz
                  ? course.type === section.type
                  : course.courseLevel === section.level && course.type === section.type)
              );

              return filteredCourses.length > 0 && (
                <Box key={index} py={32}>
                  <Title order={2} mb={16} className={classes.sectionTitle}>
                    {section.title}
                  </Title>

                  {section.type === CourseType.Quiz && (
                    <Text size="lg" color="dimmed" mb={24} mxaw={800}>
                      Evaluate your understanding through our comprehensive quizzes covering various topics.
                    </Text>
                  )}

                  <CarouselWrapper>
                    {filteredCourses.map((course) => (
                      <Carousel.Slide key={course.courseSlug}>
                        <BadgeCard
                          slug={course.courseSlug}
                          image={course.courseImage}
                          title={course.courseName}
                          category={`Week ${course.week} • Class ${course.studio}`}
                          description={course.courseIntroduction.replace(/<\/?[^>]+(>|$)/g, "")}
                          badges={course.topics.map((topic) => topic.topicSlug)}
                        />
                      </Carousel.Slide>
                    ))}
                  </CarouselWrapper>
                </Box>
              );
            })
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
