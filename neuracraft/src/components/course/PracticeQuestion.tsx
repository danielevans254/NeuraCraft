import axios from "axios";
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { IconCheck, IconX, IconTrendingUp } from "@tabler/icons-react";
import VariablesBox from "@/components/editor/VariablesBox";
import Latex from "@/components/Latex";
import { QuestionDifficultyBadge } from "@/components/misc/Badges";
import { QuestionDataType } from "@/types/question-types";
import { CustomMath } from "@/utils/CustomMath";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  Radio,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Question, QuestionDifficulty, QuestionWithAddedTime, User } from "@prisma/client";
import { IconBulb } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// TODO: Add different question types
interface UserData extends User {
  attempts: { [timestamp: string]: number };
}

export type UCQATAnswersType = {
  key: string;
  answerContent: string;
  isCorrect: boolean;
  isLatex: boolean;
}[];

// todo: IF A given question was given previously it needs to properly reset the selected keys

export default function PracticeQuestion() {
  const session = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const currentCourseSlug = router.query.courseSlug as string;

  const [confirmationModalOpened, setConfirmationModalOpened] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0 });
  const [lastDifficulty, setLastDifficulty] = useState<QuestionDifficulty | null>(null);
  const [attemptHistoryLocked, setAttemptHistoryLocked] = useState(false);

  // TODO: Add different question types
  // TODO: Sometimes the state isn't updated correctly, causing the streak counter to show wrong numbers
  const [questionKey, setQuestionKey] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [booleanAnswer, setBooleanAnswer] = useState(null);
  const [hintsOpened, setHintsOpened] = useState(false);

  useEffect(() => {
    const fetchStreakAndDifficulty = async () => {
      try {
        const response = await axios.get("/api/user/getStreak");
        setStreak({
          correct: response.data.streakCorrect,
          incorrect: response.data.streakIncorrect,
        });
        setLastDifficulty(response.data.lastDifficulty);
      } catch (error) {
        console.error("Failed to fetch streak and difficulty data:", error);
      }
    };

    fetchStreakAndDifficulty();
  }, []);

  const handleQuizStart = () => {
    setConfirmationModalOpened(true);
  };

  const getGradient = (streakCount: number, isCorrect: boolean) => {
    const intensity = Math.min(streakCount, 7) / 7;
    const color = isCorrect ? theme.colors.teal : theme.colors.red;

    return {
      from: color[5],
      to: color[7 - Math.floor(intensity * 5)],
      deg: 45,
    };
  };

  const fetchAttemptHistory = async () => {
    try {
      const response = await axios.get("/api/quiz/getAttemptHistory", {
        params: {
          userId: session?.data?.user?.id,
          topicSlug: UCQAT?.data.question.topicSlug,
        },
      });

      if (response.data.success) {
        // Display attempt history
        console.log(response.data.attempts);
      } else {
        setAttemptHistoryLocked(true);
      }
    } catch (error) {
      console.error("Failed to fetch attempt history:", error);
    }
  };

  const confirmQuizStart = async () => {
    setConfirmationModalOpened(false);
    // Lock attempt history for the topic
    await axios.post("/api/quiz/lockAttemptHistory", {
      userId: session?.data?.user?.id,
      topicSlug: UCQAT?.data.question.topicSlug,
    });
    // Proceed with the quiz
    refetch();
  };

  const { data: UCQAT, refetch } = useQuery({
    queryKey: ["get-ucqat"],
    queryFn: () =>
      axios.get<
        QuestionWithAddedTime & {
          question: Question & {
            topic: {
              topicName: string;
            };
          };
        }
      >(`/api/question/questionsWithAddedTime?courseSlug=${currentCourseSlug}`),
  });

  const useSubmitAnswer = () => {
    const queryClient = useQueryClient();
    const { mutate: submitAnswer, status: submitAnswerStatus } = useMutation({
      mutationFn: ({
        query,
        body,
      }: {
        query: {
          qatId: string;
          courseSlug: string;
        };
        body: {
          attemptedKeys: string[];
          isCorrect: boolean;
          topicSlug: string;
          topicName: string;
          difficulty: QuestionDifficulty;
          streakCorrect: number;
          streakIncorrect: number;
        };
      }) => {
        return axios.post(
          `/api/question/submitAnswer?qatId=${query.qatId}&courseSlug=${query.courseSlug}`,
          body
        );
      },
      onSuccess: (res) => {
        const { data } = res;
        const isCorrect = data.isCorrect;

        setStreak(prev => ({
          correct: isCorrect ? prev.correct + 1 : 0,
          incorrect: isCorrect ? 0 : prev.incorrect + 1,
        }));

        setSelectedKeys([]);
        toast(
          `[${data.topic}] Mastery: ${CustomMath.round(data.masteryLevel * 100, 1)}%`,
          {
            icon: isCorrect ? "🎉" : "💪",
            className: `border border-solid ${isCorrect ? "border-green-500" : "border-red-500"}`,
            position: "top-right",
            duration: 10000,
          }
        );
        queryClient.invalidateQueries(["get-ucqat"]);
        queryClient.invalidateQueries(["get-attempts", data.courseSlug]);
        updatePoints(); // Update points for attempting questions
      },
    });

    return {
      submitAnswer,
      submitAnswerStatus,
    };
  };

  const { submitAnswer, submitAnswerStatus } = useSubmitAnswer();

  const queryClient = useQueryClient();

  // Check if first question attempted
  const { data: userInfo } = useQuery<UserData>({
    queryKey: ["userInfo", session?.data?.user?.id],
    queryFn: async () => {
      const res = await axios.post("/api/user", {
        id: session?.data?.user?.id,
      });
      return res?.data;
    },
    enabled: !!session?.data?.user?.id,
  });

  // Award points for attempting a question
  const { mutate: updatePoints } = useMutation(
    async () => {
      if (!!userInfo) {
        const lastActive = new Date(userInfo.lastActive); // get last active

        const res = await axios.post("/api/user/updatePoints", {
          id: session?.data?.user?.id,
          points:
            (userInfo.attempts[lastActive.toDateString()] ?? 0) === 0
              ? userInfo.points + 5 // First question attempted today
              : userInfo.points + 1, // > 1 question attempted today
        });
        return {
          ...res,
          data: {
            ...res.data,
            customIcon: "🎯",
            message: (
              <>
                Question(s) attempted:{" "}
                {(userInfo.attempts[lastActive.toDateString()] ?? 0) + 1} 🪙
                <span className="text-yellow-600">
                  +
                  {(userInfo.attempts[lastActive.toDateString()] ?? 0) === 0
                    ? 5
                    : 1}
                </span>
              </>
            ),
          },
        };
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo", session?.data?.user?.id]); // Get latest number of attempts
      },
    }
  );

  useEffect(() => {
    if (UCQAT?.data) {
      const currentDifficulty = UCQAT.data.question.questionDifficulty;

      if (lastDifficulty && lastDifficulty !== currentDifficulty) {
        console.log(`User changed difficulty from ${lastDifficulty} to ${currentDifficulty}`);
        setStreak({ correct: 0, incorrect: 0 });
      }

      setLastDifficulty(lastDifficulty);
    }

    // Reset selectedKeys and increment questionKey whenever new UCQAT data is fetched
    setSelectedKeys([]);
    setQuestionKey(prev => prev + 1);
  }, [UCQAT?.data]);

  if (!UCQAT) {
    return (
      <Center className="h-[calc(100vh-180px)]">
        <Loader />
      </Center>
    );
  }

  if (!UCQAT.data) {
    return (
      <Center className="h-[calc(100vh-180px)]">
        <Text>Stay tuned, more questions are coming your way!</Text>
      </Center>
    );
  }

  const answerOptions = UCQAT?.data.answers as UCQATAnswersType;
  const correctKeys = Array.isArray(answerOptions)
    ? answerOptions.filter((item) => item.isCorrect).map((item) => item.key)
    : [];

  return (
    <Paper p="xl" radius="md" withBorder>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedKeys.length === 0) {
            toast.error("Please select an option");
            return;
          }
          submitAnswer({
            query: {
              qatId: UCQAT.data.qatId,
              courseSlug: currentCourseSlug,
            },
            body: {
              attemptedKeys: selectedKeys,
              isCorrect:
                selectedKeys.length === correctKeys.length &&
                selectedKeys.every((item) => correctKeys.includes(item)),
              topicSlug: UCQAT.data.question.topicSlug,
              topicName: UCQAT.data.question.topic.topicName,
              difficulty: UCQAT.data.question.questionDifficulty || "Easy", // Fallback to "Easy"
              streakCorrect: streak.correct || 0, // Fallback to 0
              streakIncorrect: streak.incorrect || 0, // Fallback to 0
            },
          });
        }}
      >
        <QuestionDifficultyBadge
          questionDifficulty={UCQAT.data.question.questionDifficulty}
          {...{ radius: "lg", size: "md" }}
        />
        {/* TODO: Fix this, this will later also be used for the topic recommendation, as a additional logic check, also style this better */}
        <Group spacing="sm" align="center" mt="md">
          {/* Streak Badge */}
          <Badge
            variant="gradient"
            gradient={getGradient(
              streak.correct > 0 ? streak.correct : streak.incorrect,
              streak.correct > 0
            )}
            size="lg"
            leftSection={
              streak.correct > 0 ? (
                <IconCheck size={16} />
              ) : (
                <IconX size={16} />
              )
            }
          >
            {streak.correct > 0
              ? `${streak.correct} correct in a row`
              : `${streak.incorrect} incorrect in a row`}
          </Badge>

          {/* Last Difficulty Badge */}
          <Badge
            color="blue"
            variant="outline"
            size="lg"
            leftSection={<IconTrendingUp size={16} />}
          >
            Last Difficulty: {lastDifficulty || "N/A"}
          </Badge>
        </Group>
        <div
          className="rawhtml mt-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(UCQAT.data.question.questionContent, {
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
          variables={UCQAT.data.variables as QuestionDataType["variables"]}
        />
        {correctKeys.length === 1 ? (
          <Radio.Group
            key={`radio-group-${questionKey}`}
            mt="xl"
            value={selectedKeys[0] || ''} // Ensure it's always a string
            onChange={(value) => {
              setSelectedKeys([value]);
            }}
            orientation="vertical"
            description="Select only one option"
            required
          >
            {answerOptions?.map((item) => (
              <Radio
                key={item.key}
                value={item.key}
                label={
                  item.isLatex ? (
                    <Latex>{`$$ ${item.answerContent} $$`}</Latex>
                  ) : (
                    <Text>{item.answerContent}</Text>
                  )
                }
                className={`flex items-center justify-start rounded-md border border-solid ${theme.colorScheme === "dark"
                  ? "border-zinc-600 bg-zinc-700"
                  : "border-gray-200 bg-gray-100"
                  } p-2`}
              />
            ))}
          </Radio.Group>
        ) : (
          <Checkbox.Group
            mt="xl"
            value={selectedKeys}
            onChange={setSelectedKeys}
            orientation="vertical"
            description="Select all correct options"
            required
          >
            {UCQAT?.data?.question?.questionData.answers ? (
              UCQAT.data.question.questionData.answers.map((item) => (
                <Checkbox
                  key={item.key}
                  value={item.key}
                  label={
                    item.isLatex ? (
                      <Latex>{item.answerContent}</Latex>
                    ) : (
                      <Text>{item.answerContent}</Text>
                    )
                  }
                  className={`flex items-center justify-start rounded-md border border-solid ${theme.colorScheme === "dark"
                    ? "border-zinc-600 bg-zinc-700"
                    : "border-gray-200 bg-gray-100"
                    } p-2`}
                />
              ))
            ) : (
              <Text>No answer options available.</Text>
            )}
          </Checkbox.Group>
        )}
        <Flex mt="xl" align="center" gap="md">
          <Button
            type="submit"
            variant="light"
            fullWidth
            loading={submitAnswerStatus === "loading"}
          >
            {submitAnswerStatus === "loading" ? "Submitting..." : "Submit"}
          </Button>
          {(UCQAT.data.question.questionData as QuestionDataType).hints && (
            <Tooltip label="Hints" withArrow>
              <ActionIcon
                size="lg"
                variant="light"
                radius="xl"
                onClick={() => setHintsOpened(true)}
              >
                <IconBulb size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>

        {/* Hints Modal */}
        <Modal
          opened={hintsOpened}
          onClose={() => setHintsOpened(false)}
          title="Hints"
          size="md"
        >
          <Stack>
            {(UCQAT.data.question.questionData as QuestionDataType).hints?.map(
              (item, index) => (
                <Box
                  key={index}
                  className="flex items-center justify-start gap-3 rounded-md border border-solid border-gray-200 bg-gray-100 p-2"
                >
                  <Text color="dimmed">#{index + 1}</Text>
                  <Text>{item.hint}</Text>
                </Box>
              )
            )}
          </Stack>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          opened={confirmationModalOpened}
          onClose={() => setConfirmationModalOpened(false)}
          title="Are you sure you want to take this quiz?"
          centered
        >
          <Text>
            If you proceed, your attempt history for this topic will be locked for 5 minutes.
            You will not be able to view your attempt history for this topic during this time.
          </Text>
          <Group position="right" mt="md">
            <Button variant="outline" onClick={() => setConfirmationModalOpened(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmQuizStart}>
              Start Quiz
            </Button>
          </Group>
        </Modal>
      </form>
    </Paper>
  );
}