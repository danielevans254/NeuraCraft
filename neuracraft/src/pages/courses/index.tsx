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
} from "@mantine/core";
import { Course, CourseMedia, CourseType, Level, Topic } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type CourseWithMediaAndTopicType = Course & {
  courseMedia: CourseMedia[];
  topics: Topic[];
};

export default function CoursesPage() {
  function BadgeCard({
    slug,
    image,
    title,
    description,
    category,
    badges,
  }: {
    slug: string;
    image: string;
    title: string;
    category: string;
    description: string;
    badges: string[];
  }) {
    const features = badges.map((badge) => (
      <Badge color="gray" key={badge} size="sm" variant="filled">
        {badge}
      </Badge>
    ));

    return (
      <div className="card bg-gray-100 hover:shadow-lg transition-shadow duration-300 rounded-md m-4 overflow-hidden">
        <Link href={`/courses/${slug}`} passHref>
          <div className="relative h-52 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <Badge className="absolute top-3 right-3 bg-blue-500 text-white" size="sm">
              {category}
            </Badge>
          </div>
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm mt-2 text-gray-600">{description}</p>
          </div>
          <div className="p-4">
            <p className="text-xs uppercase font-semibold text-gray-500 mb-2">Topics</p>
            <div className="flex space-x-2">{features}</div>
          </div>
        </Link>
      </div>
    );
  }

  function CarouselWrapper({ children }: { children: React.ReactNode }) {
    return (
      <Carousel
        slideSize="40%"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%", slideGap: "sm" },
          { maxWidth: "sm", slideSize: "100%" },
        ]}
        align="start"
        slideGap="md"
        controlsOffset={-20}
        controlSize={30}
        height="100%"
        pb="xl"
        withIndicators
        className="w-full"
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
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header title="All Courses" />
      <Navbar />
      <div className="relative container mx-auto py-10">
        <Dots dotPositions={[{ left: 0, top: 0 }, { left: 120, top: 20 }, { right: 20, top: 60 }, { right: 60, top: 200 }]} />
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-8">All Courses</h1>
        </div>
      </div>

      {[
        { title: "Quizzes", type: CourseType.Quiz },
        { title: "Foundational Courses", type: CourseType.Content, level: Level.Foundational },
        { title: "Intermediate Courses", type: CourseType.Content, level: Level.Intermediate },
        { title: "Advanced Courses", type: CourseType.Content, level: Level.Advanced }
      ].map((section, index) => (
        <div key={index} className="container mx-auto py-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-left mb-4">{section.title}</h2>
          <p className="text-lg text-gray-600 mb-6">
            {section.title === "Quizzes" ? "Quizzes in Neuracraft are designed to test your knowledge..." : ""}
          </p>
          <CarouselWrapper>
            {courses.data
              .filter((course) =>
                section.type === CourseType.Quiz ? course.type === section.type
                  : course.courseLevel === section.level && course.type === section.type
              )
              .map((course) => (
                <Carousel.Slide key={course.courseSlug}>
                  <BadgeCard
                    {...{
                      slug: course.courseSlug,
                      image: course.courseImage,
                      title: course.courseName,
                      category: `W${course.week}S${course.studio}`,
                      description: course.courseDescription.replace(/<\/?[^>]+(>|$)/g, ""),
                      badges: course.topics.map((topic) => topic.topicSlug),
                    }}
                  />
                </Carousel.Slide>
              ))}
          </CarouselWrapper>
        </div>
      ))}
      <Footer />
    </>
  );
}
