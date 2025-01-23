import axios from "axios";
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import VariablesBox from "@/components/editor/VariablesBox";
import Latex from "@/components/Latex";
import { QuestionDifficultyBadge } from "@/components/misc/Badges";
import { QuestionDataType } from "@/types/question-types";
import { CustomMath } from "@/utils/CustomMath";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  Modal,
  Paper,
  Radio,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Question, QuestionWithAddedTime, User } from "@prisma/client";
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

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // TODO: Add different question types
  const [questionKey, setQuestionKey] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [booleanAnswer, setBooleanAnswer] = useState(null);
  const [hintsOpened, setHintsOpened] = useState(false);

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
        };
      }) => {
        return axios.post(
          `/api/question/submitAnswer?qatId=${query.qatId}&courseSlug=${query.courseSlug}`,
          body
        );
      },
      onSuccess: (res) => {
        setSelectedKeys([]);
        const { data } = res;
        toast(
          `[${data.topic}] Mastery: ${CustomMath.round(
            data.masteryLevel * 100,
            1
          )}%`,
          {
            icon: data.isCorrect ? "🎉" : "💪",
            className: `border border-solid ${data.isCorrect ? "border-green-500" : "border-red-500"
              }`,
            position: "top-right",
            duration: 5000,
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
    // Reset selectedKeys and increment questionKey whenever new UCQAT data is fetched
    setSelectedKeys([]);
    setQuestionKey(prev => prev + 1);
  }, [UCQAT?.data]);
  console.log(questionKey, "questionKey")

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
            },
          });
        }}
      >
        <QuestionDifficultyBadge
          questionDifficulty={UCQAT.data.question.questionDifficulty}
          {...{ radius: "lg", size: "md" }}
        />
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
      </form>
    </Paper>
  );
}
