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
  Progress,
  Radio,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Question, QuestionDifficulty, QuestionWithAddedTime, User } from "@prisma/client";
import { IconBook, IconBulb } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

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

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0 });
  const [lastDifficulty, setLastDifficulty] = useState<QuestionDifficulty | null>(null);

  // TODO: Fetch the topic for the mastery level so when the mastery level hits 100%, it can be shown as a toast notification that the mastery level was reset and will go back to easy, and the cycle will begin
  const [topicMasteryLevel, setTopicMasteryLevel] = useState({ studentId: "", topic: "", masteryLevel: 0, period: "" });

  // TODO: Add different question types
  // TODO: Sometimes the state isn't updated correctly, causing the streak counter to show wrong numbers
  const [questionKey, setQuestionKey] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [booleanAnswer, setBooleanAnswer] = useState(null);
  const [hintsOpened, setHintsOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [recommendationData, setRecommendationData] = useState<{
    url: string;
    topic: string;
    currentMastery: number;
    previousMastery: number;
  } | null>(null);

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

  useEffect(() => {
    const fetchTopicMasteryLevel = async () => {
      try {
        const response = await axios.get("/api/user/getMasteryGivenTopic");
        setStreak({
          correct: response.data.streakCorrect,
          incorrect: response.data.streakIncorrect,
        });
        setLastDifficulty(response.data.lastDifficulty);
      } catch (error) {
        console.error("Failed to fetch streak and difficulty data:", error);
      }
    };
    fetchTopicMasteryLevel();
  }, []);

  const getGradient = (streakCount: number, isCorrect: boolean) => {
    const intensity = Math.min(streakCount, 7) / 7;
    const color = isCorrect ? theme.colors.teal : theme.colors.red;

    return {
      from: color[5],
      to: color[7 - Math.floor(intensity * 5)],
      deg: 45,
    };
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
      mutationFn: async ({
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
        const response = await axios.post(
          `/api/question/submitAnswer?qatId=${query.qatId}&courseSlug=${query.courseSlug}`,
          body
        );
        return response.data; // Return only the response data
      },
      onSuccess: (data) => { // Now receiving direct response data
        const isCorrect = data?.isCorrect ?? false;

        setStreak(prev => ({
          correct: isCorrect ? prev.correct + 1 : 0,
          incorrect: isCorrect ? 0 : prev.incorrect + 1,
        }));

        setSelectedKeys([]);

        if (data) {
          toast(
            `[${data.topic}] Mastery: ${CustomMath.round(data.masteryLevel * 100, 1)}%`,
            {
              icon: isCorrect ? "🎉" : "💪",
              className: `border border-solid ${isCorrect ? "border-green-500" : "border-red-500"}`,
              position: "top-right",
              duration: 10000,
            }
          );

          if (!isCorrect) {
            checkForRecommendation();
            console.log('Checking for recommendation...');

          }
        }

        queryClient.invalidateQueries(["get-ucqat"]);
        queryClient.invalidateQueries(["get-attempts", data?.courseSlug]);
        updatePoints();
      },
      onError: (error) => {
        console.error('Submission error:', error);
        toast.error('Failed to submit answer');
      }
    });

    return { submitAnswer, submitAnswerStatus };
  };

  const checkForRecommendation = async () => {
    try {
      const response = await axios.get('/api/course/topic-recommendation', {
        params: {
          userId: session.data?.user?.id,
          courseSlug: currentCourseSlug
        }
      });

      if (response.data?.recommendationUrl) {
        setRecommendationData({
          url: response.data.recommendationUrl,
          topic: response.data.recommendedTopic,
          currentMastery: response.data.currentMastery,
          previousMastery: response.data.previousPeakMastery
        });
        open();
      }
    } catch (error) {
      console.error('Recommendation check failed:', error);
    }
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
              ? userInfo.points + 5
              : userInfo.points + 1,
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
        queryClient.invalidateQueries(["userInfo", session?.data?.user?.id]);
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
        ) : null}
        {correctKeys.length > 1 ? (
          <Checkbox.Group
            mt="xl"
            value={selectedKeys}
            onChange={setSelectedKeys}
            orientation="vertical"
            description="Select all correct options"
            required
          >
            {answerOptions?.map((item) => (
              <Checkbox
                key={item.key}
                value={item.key}
                label={
                  item.isLatex ? (
                    <Latex>
                      {replaceVariables(
                        item.answerContent,
                        UCQAT.data.variables as Record<string, any>
                      )}
                    </Latex>
                  ) : (
                    <Text>
                      {replaceVariables(
                        item.answerContent,
                        UCQAT.data.variables as Record<string, any>
                      )}
                    </Text>
                  )
                }
                className={`flex items-center justify-start rounded-md border border-solid ${theme.colorScheme === "dark"
                  ? "border-zinc-600 bg-zinc-700"
                  : "border-gray-200 bg-gray-100"
                  } p-2`}
              />
            ))}
          </Checkbox.Group>
        ) : null}
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

        {/* TODO: Fix this */}
        <Modal
          opened={opened}
          onClose={close}
          title={
            <Group spacing="sm">
              <IconBook size={24} color={theme.colors.blue[6]} />
              <Text size="xl" weight={600}>Recommended Review Material</Text>
            </Group>
          }
          size="lg"
        >
          {recommendationData && (
            <Stack spacing="md">
              <Text>
                Your mastery in <span className="font-semibold">{recommendationData.topic}</span>
                has dropped from {CustomMath.round(recommendationData.previousMastery * 100, 1)}%
                to {CustomMath.round(recommendationData.currentMastery * 100, 1)}%.
              </Text>

              <Progress
                size="xl"
                sections={[
                  {
                    value: recommendationData.previousMastery * 100,
                    color: 'blue',
                    label: 'Previous Mastery',
                    tooltip: `${CustomMath.round(recommendationData.previousMastery * 100, 1)}%`
                  },
                  {
                    value: (recommendationData.currentMastery - recommendationData.previousMastery) * 100,
                    color: 'red',
                    label: 'Drop',
                    tooltip: `${CustomMath.round((recommendationData.previousMastery - recommendationData.currentMastery) * 100, 1)}% drop`
                  }
                ]}
              />

              <Group position="apart" mt="md">
                <Button
                  variant="outline"
                  onClick={close}
                >
                  Continue Practicing
                </Button>
                <Button
                  color="blue"
                  onClick={() => {
                    close();
                    router.push(recommendationData.url);
                  }}
                >
                  Review Material Now
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </form>
    </Paper>
  );
}