import axios from "axios";
import DOMPurify from "dompurify";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
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
  const { width } = useViewportSize();

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  useMemo(() => {
    if (mobile !== undefined) {
      setSidebarOpened(!mobile);
    }
  }, [mobile]);

  const [section, setSection] = useSessionStorage<"learn" | "practice">({
    key: "courseSectionTab",
    defaultValue: "learn",
  });
  const [active, setActive] = useSessionStorage({
    key: "courseActiveTab",
    defaultValue: "Overview",
  });

  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const router = useRouter();
  const currentCourseSlug = router.query.courseSlug;

  const { data: course } = useQuery({
    queryKey: ["course", currentCourseSlug],
    queryFn: () =>
      axios.get<CourseInfoType>(`/api/course/${currentCourseSlug}`),
  });

  if (!course) {
    return (
      <Center className="h-[calc(100vh-180px)]">
        <Loader />
      </Center>
    );
  }

  const tabs = {
    learn: [
      { label: "Overview", icon: IconApps },
      courseDetails.courseMedia.length > 0
        ? { label: "Lecture Slides", icon: IconPresentation }
        : null,
      courseDetails.video ? { label: "Lecture Videos", icon: IconVideo } : null,
      courseDetails.markdown
        ? { label: "Additional Resources", icon: IconReportSearch }
        : null,
    ],
    practice: [
      { label: "Question", icon: IconZoomQuestion },
      { label: "Attempts", icon: IconChartLine },
      { label: "Mastery", icon: IconTarget },
    ],
  };

  const links = tabs[section].map(
    (item) =>
      item && (
        <a
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          key={item.label}
          onClick={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            setActive(item.label);
            mobile && setSidebarOpened(false);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
      )
  );

  // Function to add width and height attributes to iframe tags
  const addIframeAttributes = (htmlString: string, width = "100%", height = "100%") => {
    // Check if the string contains an iframe tag
    if (!htmlString.includes("<iframe")) return htmlString;

    // Replace iframe tags with width and height attributes
    return htmlString.replace(/<iframe(.*?)>/g, `<iframe$1 width="${width}" height="${height}">`);
  };

  // Check if courseDetails.video contains an iframe tag
  const hasIframeVideo = /<iframe.*?>/.test(courseDetails.video as string);

  // If it does, add the width and height attributes to the iframe tag
  const modifiedVideo = hasIframeVideo
    ? addIframeAttributes(courseDetails.video as string)
    : courseDetails.video;

  // Split the markdown by iframe tags
  const parts = courseDetails.markdown?.split(/(<iframe.*?>.*?<\/iframe>)/g);

  const output = parts?.map((part) => {
    if (part.includes("<iframe")) {
      // Add width and height to the iframe
      const iframe = addIframeAttributes(part);
      return { type: "video", string: iframe };
    } else {
      // Return markdown part
      return { type: "markdown", string: part };
    }
  });

  const sidebarWidth = 200; // Replace 200 with the actual width value

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
                value={section}
                onChange={(value: "learn" | "practice") => setSection(value)}
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
        ) : null
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
          courseDetails.courseMedia.map((media) => (
            <Stack align="center" key={media.publicId}>
              <div className="flex items-center gap-4">
                <Title order={3}>{media.mediaName}</Title>
                <Tooltip label="Download Slides" withArrow>
                  <ActionIcon
                    variant="default"
                    className="rounded-full p-1"
                    component="a"
                    href={media.courseMediaURL}
                    target="_blank"
                  >
                    <IconDownload size={16} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
              </div>
              <Document
                file={media.courseMediaURL}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={sidebarWidth} />
              </Document>
              <div className="flex gap-4">
                <Button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  variant="light"
                  size="sm"
                >
                  <IconChevronsLeft size={20} stroke={1.5} />
                </Button>
                <Tooltip label="Jump to Page 1" withArrow>
                  <Button variant="light" onClick={() => setPageNumber(1)} size="sm">
                    Page {pageNumber} of {numPages}
                  </Button>
                </Tooltip>
                <Button
                  onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                  variant="light"
                  size="sm"
                >
                  <IconArrowRight size={20} stroke={1.5} />
                </Button>
              </div>
            </Stack>
          ))
        ) : active === "Lecture Videos" ? (
          <div className="h-[calc(100vh-180px)] w-full h-full">
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
