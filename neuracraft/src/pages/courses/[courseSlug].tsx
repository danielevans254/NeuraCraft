import axios from "axios";
import DOMPurify from "dompurify";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

import CourseDiscussion from "@/components/course/CourseDiscussion";
import PracticeQuestion from "@/components/course/PracticeQuestion";
import QuestionHistory from "@/components/course/QuestionHistory";
import ResultsPage from "@/components/course/ResultsPage";
import Footer from "@/components/Footer";
import TopHeader from "@/components/Header";
import Latex from "@/components/Latex";
import TopNavbar from "@/components/Navbar";
import { getCourseDetails } from "@/pages/api/course/[courseSlug]";
import { prisma } from "@/server/db/client";
import {
  ActionIcon, AppShell, Box, Button, Center, Container, createStyles, Divider,
  Flex, Header, Loader, Navbar as Sidebar, ScrollArea, SegmentedControl, Stack,
  Text, Title, Tooltip, TypographyStylesProvider,
} from "@mantine/core";
import {
  useMediaQuery, useSessionStorage, useViewportSize,
} from "@mantine/hooks";
import { Course, CourseMedia, Mastery, Topic } from "@prisma/client";
import {
  IconApps, IconArrowBarLeft, IconArrowLeft, IconArrowRight, IconChartLine,
  IconChevronsLeft, IconChevronsRight, IconDownload, IconMessages,
  IconPresentation, IconReportSearch, IconTarget, IconVideo, IconZoomQuestion,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import PaginatedPDFViewer from "@/components/course/PaginatedPDFViewer";

export type CourseInfoType = {
  topics: (Topic & {
    mastery: Mastery[];
  })[];
} | null;
export type UserQuestionWithAttemptsType = {
  topics: (Topic & {
    mastery: Mastery[];
  })[];
} | null;
export default function CourseMainPage({
  courseDetails,
}: {
  courseDetails: Course & { courseMedia: CourseMedia[] };
}) {
  const { theme, classes, cx } = useStyles();
  const { sidebarWidth } = useViewportSize();
  const router = useRouter();
  const { courseSlug, tab, section = "learn" } = router.query;

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [active, setActive] = useState("Overview");
  const [currentSection, setCurrentSection] = useState(section as string);

  // React Query configuration
  const { data: courseData, isLoading, isError } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: async () => {
      const response = await axios.get<CourseInfoType>(`/api/course/${courseSlug}`);
      return response.data;
    },
    enabled: !!courseSlug, // Only run query when courseSlug is available
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });

  useEffect(() => {
    if (tab) {
      const formattedTab = tab === "overview"
        ? "Overview"
        : tab === "lecture-slides"
          ? "Lecture Slides"
          : tab === "lecture-videos"
            ? "Lecture Videos"
            : tab === "resources"
              ? "Additional Resources"
              : tab === "discussion"
                ? "Course Discussion"
                : tab === "question"
                  ? "Question"
                  : tab === "attempts"
                    ? "Attempts"
                    : tab === "mastery"
                      ? "Mastery"
                      : "Overview";

      setActive(formattedTab);
    }
  }, [tab]);

  const handleSectionChange = (value: "learn" | "practice") => {
    setCurrentSection(value);
    const defaultTab = value === "learn" ? "overview" : "question";
    setActive(defaultTab);
    router.push(
      {
        pathname: `/courses/${courseSlug}`,
        query: { section: value, tab: defaultTab },
      },
      undefined,
      { shallow: true }
    );
  };

  const tabs = useMemo(() => ({
    learn: [
      { label: "Overview", icon: IconApps, route: "overview" },
      courseDetails.courseMedia.length > 0 && {
        label: "Lecture Slides",
        icon: IconPresentation,
        route: "lecture-slides"
      },
      courseDetails.video && {
        label: "Lecture Videos",
        icon: IconVideo,
        route: "lecture-videos"
      },
      courseDetails.markdown && {
        label: "Additional Resources",
        icon: IconReportSearch,
        route: "resources"
      },
    ].filter(Boolean),
    practice: [
      { label: "Question", icon: IconZoomQuestion, route: "question" },
      { label: "Attempts", icon: IconChartLine, route: "attempts" },
      { label: "Mastery", icon: IconTarget, route: "mastery" },
    ],
  }), [courseDetails]);

  const handleNavigation = (route: string, label: string) => {
    router.push({
      pathname: `/courses/${courseSlug}`,
      query: { section: currentSection, tab: route }
    }, undefined, { shallow: true });
    mobile && setSidebarOpened(false);
  };

  const links = useMemo(() => (
    tabs[currentSection as keyof typeof tabs].map((item) => (
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.route === tab,
        })}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          handleNavigation(item.route, item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ))
  ), [tabs, currentSection, tab, courseSlug, mobile]);

  useEffect(() => {
    if (courseSlug && !tab) {
      // Push initial route with default tab
      router.push({
        pathname: `/courses/${courseSlug}`,
        query: {
          section: currentSection,
          tab: "overview"
        }
      }, undefined, { shallow: true });
    }
  }, [courseSlug]); // Add this effect to handle initial routing

  // Handle loading and error states
  if (isLoading) {
    return (
      <AppShell
        className="h-screen"
        navbarOffsetBreakpoint="sm"
        header={
          <>
            <TopHeader title={courseDetails.courseName} />
            <Header height={80}>
              <Container className="flex items-center h-full">
                <TopNavbar
                  sidebarOpened={sidebarOpened}
                  setSidebarOpened={setSidebarOpened}
                />
              </Container>
            </Header>
          </>
        }
      >
        <Center className="h-[calc(100vh-180px)]">
          <Loader size="xl" />
        </Center>
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell
        className="h-screen"
        navbarOffsetBreakpoint="sm"
        header={
          <>
            <TopHeader title={courseDetails.courseName} />
            <Header height={80}>
              <Container className="flex items-center h-full">
                <TopNavbar
                  sidebarOpened={sidebarOpened}
                  setSidebarOpened={setSidebarOpened}
                />
              </Container>
            </Header>
          </>
        }
      >
        <Center className="h-[calc(100vh-180px)]">
          <Stack align="center" spacing="md">
            <Text size="xl" weight={500} color="red">
              Failed to load course data
            </Text>
            <Button onClick={() => router.reload()}>
              Retry
            </Button>
          </Stack>
        </Center>
      </AppShell>
    );
  }

  // Helper functions
  const addIframeAttributes = (htmlString: string, width = "100%", height = "100%") => {
    if (!htmlString?.includes("<iframe")) return htmlString;
    return htmlString.replace(/<iframe(.*?)>/g, `<iframe$1 width="${width}" height="${height}">`);
  };

  const hasIframeVideo = courseDetails.video && /<iframe.*?>/.test(courseDetails.video);
  const modifiedVideo = hasIframeVideo
    ? addIframeAttributes(courseDetails.video as string)
    : courseDetails.video;

  const parts = courseDetails.markdown?.split(/(<iframe.*?>.*?<\/iframe>)/g);
  const output = parts?.map((part) => {
    if (part.includes("<iframe")) {
      const iframe = addIframeAttributes(part);
      return { type: "video", string: iframe };
    }
    return { type: "markdown", string: part };
  });

  // const sidebarWidth = 500;

  return (
    <AppShell
      className="h-screen"
      navbarOffsetBreakpoint="sm"
      header={
        <>
          <TopHeader title={courseDetails.courseName} />
          <Header height={80}>
            <Container className="flex items-center h-full">
              <TopNavbar
                sidebarOpened={sidebarOpened}
                setSidebarOpened={setSidebarOpened}
              />
            </Container>
          </Header>
        </>
      }
      footer={<Footer />}
      navbar={
        sidebarOpened ? (
          <Sidebar
            p="md"
            width={{ sm: 200, lg: 300 }}
            className="bg-gray-100 shadow-md"
          >
            <Sidebar.Section>
              <Text weight={600} size="lg" align="center" mb="lg">
                {courseDetails.courseName}
              </Text>

              <SegmentedControl
                value={currentSection}
                onChange={handleSectionChange}
                transitionTimingFunction="ease"
                fullWidth
                data={[
                  { label: "Learn", value: "learn" },
                  { label: "Practice", value: "practice" },
                ]}
              />
            </Sidebar.Section>

            <Sidebar.Section mt="xl" grow>
              {links}
              <Divider my="sm" variant="dotted" />
              <a
                className={`block px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-200 ${"Course Discussion" === active ? "bg-blue-100" : ""
                  }`}
                onClick={(event) => {
                  event.preventDefault();
                  setActive("Course Discussion");
                  router.push({
                    pathname: `/courses/${courseSlug}`,
                    query: {
                      section: currentSection,
                      tab: "discussion"
                    }
                  }, undefined, { shallow: true });
                  mobile && setSidebarOpened(false);
                }}
              >
                <IconMessages className="mr-2 h-5 w-5" stroke={1.5} />
                <span>Discussion</span>
              </a>
              <Link href="/courses" passHref>
                <Box className="block px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-200">
                  <IconArrowBarLeft className="mr-2 h-5 w-5" stroke={1.5} />
                  <span>Back to Courses</span>
                </Box>
              </Link>
            </Sidebar.Section>
          </Sidebar>
        ) : undefined
      }
    >
      <ScrollArea className="h-full">
        {active === "Overview" ? (
          <Container>
            <Title mb="lg">{courseDetails.courseName}</Title>
            <TypographyStylesProvider className="text-xl">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(courseDetails.courseDescription, {
                    ADD_TAGS: ["iframe"],
                    ADD_ATTR: [
                      "allow",
                      "allowfullscreen",
                      "frameborder",
                      "scrolling",
                    ],
                  }),
                }}
              />
            </TypographyStylesProvider>
          </Container>
        ) : active === "Lecture Slides" ? (
          <PaginatedPDFViewer
            courseMedia={courseDetails.courseMedia}
            sidebarWidth={sidebarWidth}
          />
        ) : active === "Lecture Videos" ? (
          <div className="h-[calc(100vh-180px)] w-full">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: modifiedVideo ? DOMPurify.sanitize(modifiedVideo, {
                  ADD_TAGS: ["iframe"],
                  ADD_ATTR: [
                    "allow",
                    "allowfullscreen",
                    "frameborder",
                    "scrolling",
                  ],
                }) : '',
              }}
            />
          </div>
        ) : active === "Additional Resources" ? (
          <div className="w-full h-full">
            {output?.map((resource) =>
              resource.type === "video" ? (
                <div
                  key={resource.string}
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(resource.string, {
                      ADD_TAGS: ["iframe"],
                      ADD_ATTR: [
                        "allow",
                        "allowfullscreen",
                        "frameborder",
                        "scrolling",
                      ],
                    }),
                  }}
                />
              ) : (
                <Latex key={resource.string} className="w-full h-full">
                  {resource.string}
                </Latex>
              )
            )}
          </div>
        ) : active === "Course Discussion" ? (
          <CourseDiscussion courseName={courseDetails.courseName} />
        ) : active === "Question" ? (
          <PracticeQuestion />
        ) : active === "Attempts" ? (
          <QuestionHistory courseSlug={courseDetails.courseSlug} />
        ) : active === "Mastery" ? (
          <ResultsPage />
        ) : (
          <Text>Error</Text>
        )}
      </ScrollArea>
    </AppShell>
  );
}

export async function getStaticPaths() {
  if (process.env.SELF_HOSTED) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const courses: Course[] = await prisma.course.findMany();

  const paths = courses.map((course) => ({
    params: { courseSlug: course.courseSlug },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const courseDetails = await getCourseDetails(params?.courseSlug as string);

  console.log(
    typeof courseDetails === "object"
      ? `PRERENDERED /${params?.courseSlug} DETAILS`
      : "FAILED TO PRERENDER"
  );

  return {
    props: {
      courseDetails,
    },
  };
};

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    appshell: {
      main: {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    },

    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: "pointer",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});