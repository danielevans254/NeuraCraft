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
import { Activity, AlertCircle } from "lucide-react";

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


interface UserStats {
  topicMastery: number;          // 0-100
  historicalAccuracy: number;    // 0-100
  recentErrors: number;          // Count of recent mistakes
  masteryTrend: number;         // Recent improvement rate (-1 to 1)
  averageResponseTime: number;  // In seconds
  consecutiveCorrect: number;   // Streak of correct answers
  lastAttemptTimestamp: number; // Unix timestamp
}

// TODO: Fix this

function calculateAccuracy(attempts: any[]): number {
  if (!attempts.length) return 0;
  const correctAttempts = attempts.filter(a => a.isCorrect).length;
  return (correctAttempts / attempts.length) * 100;
}

function countRecentErrors(attempts: any[]): number {
  // Count errors in the last 24 hours
  const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
  return attempts.filter(a =>
    !a.isCorrect && new Date(a.submittedAt).getTime() > last24Hours
  ).length;
}

function calculateMasteryTrend(history: any[]): number {
  if (history.length < 2) return 0;

  const recent = history.slice(-5);
  const averageChange = recent.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    return acc + (curr.masteryLevel - arr[idx - 1].masteryLevel);
  }, 0) / (recent.length - 1);

  return averageChange;
}

function calculateAverageTime(attempts: any[]): number {
  if (!attempts.length) return 0;
  const validAttempts = attempts.filter(a => a.attemptSeconds);
  if (!validAttempts.length) return 0;

  const totalTime = validAttempts.reduce((acc, curr) => acc + curr.attemptSeconds, 0);
  return totalTime / validAttempts.length;
}

function calculateStreak(attempts: any[]): number {
  let streak = 0;
  for (const attempt of attempts) {
    if (!attempt.isCorrect) break;
    streak++;
  }
  return streak;
}

function getLastAttemptTime(attempts: any[]): number {
  if (!attempts.length) return Date.now();
  return new Date(attempts[0].submittedAt).getTime();
}


const fetchUserStats = async (userId: string, topicSlug: string): Promise<UserStats> => {
  const [masteryResponse, attemptsResponse] = await Promise.all([
    axios.get(`/api/mastery/get-mastery`, { params: { userId, topicSlug } }),
    axios.get(`/api/question/getAttemptHistory`, { params: { userId, topicSlug, limit: 10 } })
  ]);

  const mastery = masteryResponse.data;
  const attempts = attemptsResponse.data;

  return {
    topicMastery: mastery.masteryLevel * 100,
    historicalAccuracy: calculateAccuracy(attempts),
    recentErrors: countRecentErrors(attempts),
    masteryTrend: calculateMasteryTrend(mastery.history),
    averageResponseTime: calculateAverageTime(attempts),
    consecutiveCorrect: calculateStreak(attempts),
    lastAttemptTimestamp: getLastAttemptTime(attempts)
  };
};



export default function PracticeQuestion() {
  const session = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const currentCourseSlug = router.query.courseSlug as string;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [streak, setStreak] = useState({ correct: 0, incorrect: 0 });
  const [lastDifficulty, setLastDifficulty] = useState<QuestionDifficulty | null>(null);

  const userId = session.data?.user?.id ?? undefined;
  // const { data: userStats, isLoading } = useUserStats(userId, currentCourseSlug);


  // TODO: Fetch the topic for the mastery level so when the mastery level hits 100%, it can be shown as a toast notification that the mastery level was reset and will go back to easy, and the cycle will begin
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

  // TODO
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
        console.error("Failed to fetch topic mastery data:", error);
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

  // TODO: If the user continues practice reset the streak counter
  const shouldShowRecommendation = (
    currentQuestion: Question,
    userStats: UserStats,
    config = {
      timeWeight: 0.15,
      masteryWeight: 0.20,
      accuracyWeight: 0.25,
      trendWeight: 0.15,
      streakWeight: 0.15,
      errorWeight: 0.25
    }
  ) => {
    const safeUserStats = {
      topicMastery: clamp(userStats.topicMastery ?? 50, 0, 100),
      historicalAccuracy: clamp(userStats.historicalAccuracy ?? 50, 0, 100),
      recentErrors: Math.max(0, userStats.recentErrors ?? 0),
      masteryTrend: clamp(userStats.masteryTrend ?? 0, -1, 1),
      averageResponseTime: Math.max(0, userStats.averageResponseTime ?? 30),
      consecutiveCorrect: Math.max(0, userStats.consecutiveCorrect ?? 0),
      lastAttemptTimestamp: userStats.lastAttemptTimestamp ?? Date.now(),
    };

    const DIFFICULTY_WEIGHTS = {
      Easy: 0.5,
      Medium: 0.8,
      Hard: 1.0
    };

    // Shorter decay period for errors - make recent errors more impactful
    const ERROR_DECAY_HOURS = 2;
    const hoursSinceLastAttempt = Math.max(0,
      (Date.now() - safeUserStats.lastAttemptTimestamp) / (1000 * 60 * 60)
    );
    const errorDecayFactor = Math.exp(-hoursSinceLastAttempt / ERROR_DECAY_HOURS);

    const difficultyFactor = DIFFICULTY_WEIGHTS[currentQuestion.questionDifficulty];
    const masteryFactor = calculateMasteryFactor(safeUserStats.topicMastery);
    const accuracyFactor = calculateAccuracyFactor(safeUserStats.historicalAccuracy);
    const trendFactor = calculateTrendFactor(safeUserStats.masteryTrend);
    const streakFactor = calculateStreakFactor(safeUserStats.consecutiveCorrect);
    const timeFactor = calculateTimeFactor(
      safeUserStats.averageResponseTime,
      Math.max(1, 30)
    );

    const errorFactor = Math.min(
      Math.pow((safeUserStats.recentErrors * errorDecayFactor) / 3, 1.5),
      1
    );

    if (safeUserStats.recentErrors >= 6) {
      return true;
    }

    // Calculate weighted score with validation
    const recommendationScore = Math.max(0, Math.min(1,
      config.masteryWeight * masteryFactor +
      config.accuracyWeight * accuracyFactor +
      config.trendWeight * trendFactor +
      config.streakWeight * streakFactor +
      config.timeWeight * timeFactor +
      config.errorWeight * errorFactor
    )) * difficultyFactor;

    const baseThreshold = 0.45;
    const dynamicThreshold = baseThreshold * (
      1 + (difficultyFactor * 0.3) - (masteryFactor * 0.2)
    );

    const randomFactor = 0.97 + (Math.random() * 0.06);
    const finalThreshold = dynamicThreshold * randomFactor;


    console.log(recommendationScore);
    console.log(finalThreshold)

    return recommendationScore >= finalThreshold;
  };

  const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  };

  const calculateMasteryFactor = (mastery: number): number => {
    return 1 / (1 + Math.exp((clamp(mastery, 0, 100) - 65) / 8));
  };

  const calculateAccuracyFactor = (accuracy: number): number => {
    return Math.pow(1 - (clamp(accuracy, 0, 100) / 100), 1.2);
  };

  const calculateTrendFactor = (trend: number): number => {
    const normalizedTrend = (clamp(trend, -1, 1) + 1) / 2;
    return trend < 0 ? normalizedTrend * 1.5 : normalizedTrend;
  };

  const calculateStreakFactor = (streak: number): number => {
    const safeStreak = Math.max(0, streak);
    return Math.max(0, 1 - Math.log10(safeStreak + 1) / 3);
  };

  const calculateTimeFactor = (avgTime: number, expectedTime: number): number => {
    const safeAvgTime = Math.max(0.1, avgTime);
    const safeExpectedTime = Math.max(0.1, expectedTime);
    const timeRatio = safeAvgTime / safeExpectedTime;
    return clamp(timeRatio - 0.3, 0, 1);
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

          // TODO:
          if (!isCorrect && UCQAT?.data) {
            const recommendationParams = {
              currentQuestion: UCQAT.data.question,
              userStats: {
                topicMastery: data?.masteryLevel || 0,
                historicalAccuracy: 50,
                recentErrors: streak.incorrect + 1,
                masteryTrend: 0,
                averageResponseTime: 30,
                consecutiveCorrect: streak.correct,
                lastAttemptTimestamp: Date.now()
              }
            };

            if (shouldShowRecommendation(recommendationParams.currentQuestion, recommendationParams.userStats)) {
              checkForRecommendation();

              console.log(shouldShowRecommendation(recommendationParams.currentQuestion, recommendationParams.userStats));
            }
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
          userId: userId,
          courseSlug: currentCourseSlug
        }
      });

      if (response.data?.recommendationUrl) {
        setRecommendationData({
          url: response.data.recommendationUrl,
          topic: response.data.recommendedTopic,
          currentMastery: Number(response.data.currentMastery) || 0,
          previousMastery: Number(response.data.previousPeakMastery) || 0
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
              difficulty: UCQAT.data.question.questionDifficulty || "Easy",
              streakCorrect: streak.correct || 0,
              streakIncorrect: streak.incorrect || 0,
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
          onClose={() => {
            close();
            setRecommendationData(null);
          }}
          title={
            <Group spacing="sm">
              <IconBook size={24} color={theme.colors.blue[6]} />
              <Text size="xl" weight={600}>Recommended Review Material</Text>
            </Group>
          }
          size="lg"
        >
          {recommendationData && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-100">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">Review Recommended</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Your recent performance suggests reviewing this material would be beneficial
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                {recommendationData.topic
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </div>


              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    close();
                    setStreak({ correct: 0, incorrect: 0 });
                  }}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Practice
                </button>
                {/* TODO: When clicking review material add another modal saying the quiz session will end if the user clicks the given, and if confirmed remove the lock */}
                <button
                  onClick={() => {
                    close();
                    router.push(recommendationData.url);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Review Material
                </button>
              </div>
            </div>
          )}
        </Modal>
      </form>
    </Paper>
  );
}