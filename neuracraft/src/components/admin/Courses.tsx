import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title as ChartTitle,
  Tooltip,
} from "chart.js/auto";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import VariablesBox from "@/components/editor/VariablesBox";
import Latex from "@/components/Latex";
import {
  AttemptsInfoType,
  UsersWithMasteriesAndAttemptsType,
} from "@/pages/admin";
import { CourseWithMediaAndTopicType } from "@/pages/courses";
import { AllQuestionsType, QuestionDataType } from "@/types/question-types";
import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Divider,
  Group,
  Loader,
  Modal,
  MultiSelect,
  Paper,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import { CourseMedia } from "@prisma/client";
import {
  IconApps,
  IconCheck,
  IconPhoto,
  IconPlus,
  IconPresentation,
  IconReportSearch,
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconUpload,
  IconUsers,
  IconVideo,
  IconX,
  IconZoomQuestion,
} from "@tabler/icons";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

// TODO: add te application upload file functionality

const Editor = dynamic(import("@/components/editor/CustomRichTextEditor"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const Courses = () => {
  const { theme, classes } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const queryClient = useQueryClient();

  const [sort, setSort] = useState("All Courses");
  const [openedDetails, setOpenedDetails] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [details, setDetails] = useState<CourseWithMediaAndTopicType | null>();
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const editMutation = useMutation({
    mutationFn: async (editCourse: {
      courseSlug: string;
      content: {
        overview: string;
        slides: CourseMedia[];
        video: string;
        additional: string;
      };
    }) => {
      const res = await axios.post("/api/course/editCourse", editCourse);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-courses"]);
      toast.success("Updated Successfully!");
    },
  });

  const [
    { data: users },
    { data: courses },
    { data: attempts },
    { data: questions },
  ] = useQueries({
    queries: [
      {
        queryKey: ["all-users"],
        queryFn: () =>
          axios.get<UsersWithMasteriesAndAttemptsType>("/api/user/admin"),
      },
      {
        queryKey: ["all-courses"],
        queryFn: () => axios.get<CourseWithMediaAndTopicType[]>("/api/course"),
      },
      {
        queryKey: ["all-attempts"],
        queryFn: () => axios.get<AttemptsInfoType>("/api/attempt/admin"),
      },
      {
        queryKey: ["all-questions"],
        queryFn: () => axios.get<AllQuestionsType>("/api/question/admin"),
      },
    ],
  });

  const thisCourse: CourseWithMediaAndTopicType | undefined =
    courses?.data.find((course) => course.courseSlug === details?.courseSlug);

  const [overviewMessage, setOverviewMessage] = useState(
    thisCourse?.courseDescription as string
  );
  const [introduction, setIntroductionMessage] = useState(
    thisCourse?.courseIntroduction as string
  );
  const [slidesMessage, setSlidesMessage] = useState(
    (thisCourse?.courseMedia as CourseMedia[]) ?? []
  );
  const [videoMessage, setVideoMessage] = useState(thisCourse?.video as string);
  const [additionalMessage, setAdditionalMessage] = useState(
    thisCourse?.markdown as string
  );
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileDisplay, setFileDisplay] = useState<string[]>([]);

  useEffect(() => {
    setOverviewMessage(details?.courseDescription as string);
    setIntroductionMessage(details?.courseIntroduction as string);
    setSlidesMessage((thisCourse?.courseMedia as CourseMedia[]) ?? []);
    setFileDisplay(
      (thisCourse?.courseMedia as CourseMedia[])?.map(
        (media) => media.mediaName
      ) ?? []
    );
    setVideoMessage(details?.video as string);
    setAdditionalMessage(details?.markdown as string);
  }, [
    details?.courseDescription,
    details?.courseIntroduction,
    details?.markdown,
    details?.video,
    thisCourse?.courseMedia,
  ]);

  if (!users || !courses || !attempts || !questions) {
    return (
      <Center className="h-screen">
        <Loader />
      </Center>
    );
  }

  const topicData: string[] = [];
  details?.topics.map((topic) => {
    topicData.push(topic.topicName);
  });

  const filteredCourses =
    sort === "All Courses"
      ? courses.data
      : courses.data.filter((c) => c.courseLevel === sort);

  const filteredTopics = details?.topics.filter((topic) =>
    multiValue.includes(topic.topicName)
  );

  const avgMasteryLevels: {
    topicName: string;
    topicSlug: string;
    avgMasteryLevel: number;
  }[] = [];

  if (filteredTopics !== undefined) {
    filteredTopics.forEach((topic) => {
      const masteryLevels: number[] = [];

      users.data.forEach((user) => {
        const mastery = user.masteries.find(
          (m) => m.topicSlug === topic.topicSlug
        );
        if (mastery !== undefined && mastery.masteryLevel !== null) {
          masteryLevels.push(mastery.masteryLevel);
        }
      });

      if (masteryLevels.length > 0) {
        const avgMasteryLevel =
          masteryLevels.reduce((a, b) => a + b) / masteryLevels.length;
        avgMasteryLevels.push({
          topicName: topic.topicName,
          topicSlug: topic.topicSlug,
          avgMasteryLevel: avgMasteryLevel,
        });
      }
    });
  }

  const handleFileUpload = async (files: FileWithPath[]): Promise<string[]> => {
    const uploadPromises = files?.map(async (file) => {
      if (
        !slidesMessage.some(
          (media) =>
            media.mediaName === file.name ||
            media.mediaName + ".pdf" === file.name
        )
      ) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "course_slides_media");
        console.log(formData);
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dy2tqc45y/image/upload",
            formData
          );
          const newMedia: CourseMedia = {
            publicId: res.data.public_id,
            courseSlug: details?.courseSlug as string,
            courseMediaURL: res.data.secure_url,
            mediaName: res.data.original_filename,
          };
          setSlidesMessage((prevSlidesMessage) => [
            ...prevSlidesMessage,
            newMedia,
          ]);
          return newMedia;
        } catch (error) {
          console.log(error);
          toast.error(error instanceof Error ? error.message : "Unknown Error");
          throw error;
        }
      }
    });
    setFiles([]);
    const uploadedMedia = await Promise.all(
      uploadPromises as Promise<CourseMedia>[]
    );
    const newSlidesMessage = [...slidesMessage, ...uploadedMedia];
    setSlidesMessage(newSlidesMessage);
    editMutation.mutate({
      courseSlug: details?.courseSlug as string,
      content: {
        overview: overviewMessage,
        slides: newSlidesMessage,
        video: videoMessage,
        additional: additionalMessage,
      },
    });

    setOpenedEdit(false);
    return uploadedMedia.map((media) => media.courseMediaURL);
  };

  const handleDeleteFile = async (name: string) => {
    const updatedFiles = files?.filter(
      (slide) => slide.name !== name && slide.name !== name + ".pdf"
    );
    setFiles(updatedFiles);

    const updatedFileDisplay = fileDisplay?.filter(
      (mediaName) => mediaName !== name && mediaName !== name + ".pdf"
    );
    setFileDisplay(updatedFileDisplay);

    const updatedSlidesMessage = slidesMessage?.filter(
      (media) => media.mediaName !== name && media.mediaName !== name + ".pdf"
    );
    setSlidesMessage(updatedSlidesMessage);

    // Note: Unsigned presets do not allow deletes after 10 mins
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-full border border-gray-200 dark:border-gray-700 p-1">
            <div className="flex space-x-1">
              {["All Courses", "Foundational", "Intermediate", "Advanced"].map((value) => (
                <button
                  key={value}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${sort === value
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  onClick={() => setSort(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {filteredCourses.map((c) => (
            <div
              key={c.courseSlug}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              {c.courseLevel === "Advanced" ? (
                <IconSquareNumber3 className="w-6 h-6 stroke-red-500 dark:stroke-red-700" />
              ) : c.courseLevel === "Foundational" ? (
                <IconSquareNumber1 className="w-6 h-6 stroke-green-500 dark:stroke-green-700" />
              ) : (
                <IconSquareNumber2 className="w-6 h-6 stroke-yellow-500 dark:stroke-yellow-700" />
              )}
              <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-gray-100">
                {c.courseName}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.courseDescription, {
                      ADD_TAGS: ["iframe"],
                      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
                    }),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.courseIntroduction, {
                      ADD_TAGS: ["iframe"],
                      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
                    }),
                  }}
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  className="flex-1 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600"
                  onClick={() => {
                    setOpenedEdit(true);
                    setDetails(c);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-green-500 text-white rounded-full py-2 px-4 hover:bg-green-600"
                  onClick={() => {
                    setOpenedDetails(true);
                    setDetails(c);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      <Modal
        isOpen={openedDetails}
        onClose={() => setOpenedDetails(false)}
        title={details?.courseName}
        size={mobile ? "full" : "70%"}
      >
        <div className="p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <IconUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-bold">
                  Number of students who attempted
                </p>
                <p className="text-xl font-bold">
                  {`${Array.from(
                    new Set(
                      attempts.data
                        .filter((user) =>
                          details?.topics.some(
                            (topic) =>
                              topic.topicSlug ===
                              user.questionWithAddedTime.question.topicSlug
                          )
                        )
                        .map((user) => user.userId)
                    )
                  ).length}/${users.data.length}`}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <MultiSelect
              value={multiValue}
              onChange={setMultiValue}
              data={topicData}
              label="Selected Topics"
              placeholder="Pick all the topics that you'd like to show"
              className="w-full"
            />
          </div>
          {avgMasteryLevels.map((topic) => (
            <div
              key={topic.topicSlug}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 my-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <IconUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-bold text-gray-500 dark:text-gray-400">
                    Average {topic.topicName} Mastery
                  </p>
                </div>
                {topic.avgMasteryLevel !== 0 ? (
                  <p className="text-md font-bold">
                    {(topic.avgMasteryLevel * 100).toFixed(2)}/100
                  </p>
                ) : (
                  <p className="text-md font-bold">No Mastery Yet!</p>
                )}
              </div>
              <div className="mt-2">
                <Progress value={topic.avgMasteryLevel * 100} size="lg" />
              </div>
              {questions.data.filter(
                (q) =>
                  q.questionsWithAddedTime.some(
                    (qt) => qt.courseSlug === details?.courseSlug
                  ) && q.topicSlug === topic.topicSlug
              ).length > 0 ? (
                <div className="mt-4">
                  <Accordion>
                    <Accordion.Item value="display-questions">
                      <Accordion.Header>
                        <p className="text-md font-bold">Display Questions</p>
                      </Accordion.Header>
                      <Accordion.Panel>
                        <Accordion>
                          {questions.data
                            .filter(
                              (question) =>
                                question.questionsWithAddedTime.some(
                                  (q) => q.courseSlug === details?.courseSlug
                                ) && question.topicSlug === topic.topicSlug
                            )
                            .map((question, index) => (
                              <Accordion.Item
                                key={question.questionId}
                                value={String(question.questionId)}
                              >
                                <Accordion.Header>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold">
                                      Question ID: {question.questionId}
                                    </p>
                                    <p className="text-sm">
                                      Total Number of Attempts:{" "}
                                      {
                                        question.questionsWithAddedTime.filter(
                                          (q) =>
                                            q.attempts.some(
                                              (a) =>
                                                a.courseSlug === details?.courseSlug
                                            )
                                        ).length
                                      }
                                    </p>
                                  </div>
                                  <p className="text-sm italic font-bold">
                                    Correct % for This Question:{" "}
                                    {(
                                      (question.questionsWithAddedTime.flatMap(
                                        (q) =>
                                          q.attempts.filter((attempt) => attempt.isCorrect)
                                      ).length /
                                        question.questionsWithAddedTime.length) *
                                      100
                                    ).toFixed(2)}
                                    %
                                  </p>
                                </Accordion.Header>
                                <Accordion.Panel>
                                  <div
                                    className="rawhtml"
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(question.questionContent, {
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
                                  <VariablesBox
                                    variables={
                                      (question.questionData as QuestionDataType).variables
                                    }
                                  />
                                </Accordion.Panel>
                              </Accordion.Item>
                            ))}
                        </Accordion>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-4">
                  <IconZoomQuestion className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    No question from Topic attempted
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal for Edit */}
      <Modal
        isOpen={openedEdit}
        onClose={() => {
          setOpenedEdit(false);
          setOverviewMessage(thisCourse?.courseDescription as string);
          setIntroductionMessage(thisCourse?.courseIntroduction as string);
          setVideoMessage(thisCourse?.video as string);
          setAdditionalMessage(thisCourse?.markdown as string);
        }}
        title={details?.courseName}
        size={mobile ? "full" : "70%"}
      >
        <div className="p-4">
          <div className="text-center">
            <p className="text-md font-bold">
              [Note]: Please use the Questions tab for question generation
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFileUpload(files);
            }}
          >
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <IconApps className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h4 className="text-lg font-bold">Edit Overview</h4>
              </div>
              <Editor
                upload_preset="course_overview_media"
                value={overviewMessage}
                onChange={setOverviewMessage}
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <IconPresentation className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h4 className="text-lg font-bold">Edit Lecture Slides</h4>
                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                  *PDF Files Only
                </p>
              </div>
              <div className="mt-2">
                {fileDisplay?.map((mediaName) => (
                  <div key={mediaName} className="flex items-center space-x-2">
                    <p className="text-sm">{mediaName}</p>
                    <button
                      onClick={() => handleDeleteFile(mediaName)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IconX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Dropzone
                onDrop={(files) => {
                  setFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
                  setFileDisplay((prevFileNames) => [
                    ...prevFileNames,
                    ...files.map((file) => file.name),
                  ]);
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={10000000}
                accept={{ "application/pdf": [".pdf"] }}
              >
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <IconUpload className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    Drag images here or click to select files
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Attach as many files as you like, each file should not exceed 5mb
                  </p>
                </div>
              </Dropzone>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <IconVideo className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h4 className="text-lg font-bold">Edit Lecture Video</h4>
              </div>
              <Editor
                upload_preset="course_video_media"
                value={videoMessage}
                onChange={setVideoMessage}
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <IconReportSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h4 className="text-lg font-bold">Edit Additional Resources</h4>
              </div>
              <Editor
                upload_preset="course_additional_media"
                value={additionalMessage}
                onChange={setAdditionalMessage}
              />
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600"
              >
                Confirm Changes
              </button>
              <button
                className="bg-gray-500 text-white rounded-full py-2 px-6 hover:bg-gray-600"
                onClick={() => {
                  setOpenedEdit(false);
                  setOverviewMessage(details?.courseDescription as string);
                  setIntroductionMessage(details?.courseIntroduction as string);
                  setSlidesMessage(details?.courseMedia as CourseMedia[]);
                  setVideoMessage(details?.video as string);
                  setAdditionalMessage(details?.markdown as string);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Courses;

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },

  action: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  item: {
    backgroundColor: theme.white,
    borderBottom: 0,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    overflow: "hidden",
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
      }`,
  },

  control: {
    fontSize: theme.fontSizes.lg,
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    color: theme.black,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  controlModal: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background
        : theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
    color:
      theme.colorScheme === "dark"
        ? theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color
        : theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .color,
  },

  image: {
    filter: theme.colorScheme === "dark" ? "invert(1)" : "none",
  },
}));
