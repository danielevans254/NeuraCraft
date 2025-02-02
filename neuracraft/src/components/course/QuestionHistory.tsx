import axios from "axios";
import DOMPurify from "dompurify";
import { useState, useMemo } from "react";

import { UCQATAnswersType } from "@/components/course/PracticeQuestion";
import VariablesBox from "@/components/editor/VariablesBox";
import Latex from "@/components/Latex";
import { QuestionDifficultyBadge } from "@/components/misc/Badges";
import { QuestionDataType } from "@/types/question-types";
import {
  Accordion,
  Badge,
  Box,
  Center,
  Checkbox,
  createStyles,
  Divider,
  Flex,
  Group,
  Loader,
  MultiSelect,
  Paper,
  RingProgress,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  Attempt,
  Question,
  QuestionDifficulty,
  QuestionWithAddedTime,
  Topic,
} from "@prisma/client";
import { IconCheck, IconHelp, IconX, IconFilter } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";

const QuestionHistory = ({ courseSlug }: { courseSlug: string }) => {
  const { theme, classes } = useStyles();
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([]);
  const [correctnessFilter, setCorrectnessFilter] = useState<string | null>(null);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);

  const { data: attempts } = useQuery({
    queryKey: ["get-attempts", courseSlug],
    queryFn: () =>
      axios.get<
        (Attempt & {
          questionWithAddedTime: QuestionWithAddedTime & {
            question: Question & {
              topic: Topic;
            };
          };
        })[]
      >(`/api/attempt?course=${courseSlug}`),
  });

  const masteryLevel = useMemo(() => {
    if (!attempts?.data) return 0;
    const totalCorrect = attempts.data.filter(attempt => attempt.isCorrect).length;
    const totalAttempts = attempts.data.length;
    return totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
  }, [attempts?.data]);

  // Extract unique topics from attempts
  const uniqueTopics = useMemo(() => {
    if (!attempts?.data) return [];
    return [...new Set(attempts.data.map(attempt =>
      attempt.questionWithAddedTime.question.topic.topicName
    ))];
  }, [attempts?.data]);

  // Filter attempts based on selected filters
  const filteredAttempts = useMemo(() => {
    if (!attempts?.data) return [];

    return attempts.data.filter(attempt => {
      const difficulty = attempt.questionWithAddedTime.question.questionDifficulty;
      const topic = attempt.questionWithAddedTime.question.topic.topicName;
      const isCorrect = attempt.isCorrect;

      const matchesDifficulty = difficultyFilters.length === 0 ||
        difficultyFilters.includes(difficulty);

      const matchesTopic = topicFilters.length === 0 ||
        topicFilters.includes(topic);

      const matchesCorrectness = correctnessFilter === null ||
        (correctnessFilter === 'correct' && isCorrect) ||
        (correctnessFilter === 'incorrect' && !isCorrect);

      return matchesDifficulty && matchesTopic && matchesCorrectness;
    });
  }, [attempts?.data, difficultyFilters, topicFilters, correctnessFilter]);

  // Recalculate statistics for filtered attempts
  const numCorrectAttempts = filteredAttempts
    .map((attempt) => attempt.isCorrect)
    .filter(Boolean).length;

  const questionDifficulties = filteredAttempts.map(
    (attempt) => attempt.questionWithAddedTime.question.questionDifficulty
  );

  const [numEasy, numMedium, numHard] = [
    questionDifficulties.filter(
      (difficulty) => difficulty === QuestionDifficulty.Easy
    ).length,
    questionDifficulties.filter(
      (difficulty) => difficulty === QuestionDifficulty.Medium
    ).length,
    questionDifficulties.filter(
      (difficulty) => difficulty === QuestionDifficulty.Hard
    ).length,
  ];

  if (!attempts) {
    return (
      <Center className="h-[calc(100vh-180px)]">
        <Loader />
      </Center>
    );
  }

  if (attempts.data.length === 0) {
    return (
      <Center className="h-[calc(100vh-180px)]">
        <Text>You have not attempted any questions from this course yet.</Text>
      </Center>
    );
  }

  return (
    <>
      <Paper withBorder radius="lg" mb="lg" p="md">
        <Title order={3} mb="md">
          <Group>
            <IconFilter /> Filters
          </Group>
        </Title>
        <Flex gap="md" direction={{ base: 'column', sm: 'row' }}>
          <MultiSelect
            label="Difficulty"
            placeholder="Filter by difficulty"
            data={['Easy', 'Medium', 'Hard']}
            value={difficultyFilters}
            onChange={setDifficultyFilters}
            clearable
          />
          <MultiSelect
            label="Topic"
            placeholder="Filter by topic"
            data={uniqueTopics}
            value={topicFilters}
            onChange={setTopicFilters}
            clearable
          />
          <Checkbox.Group
            label="Correctness"
            value={correctnessFilter ? [correctnessFilter] : []}
            onChange={(values) =>
              setCorrectnessFilter(values.length > 0 ? values[0] ?? null : null)
            }
          >
            <Group mt="xs">
              <Checkbox value="correct" label="Correct" />
              <Checkbox value="incorrect" label="Incorrect" />
            </Group>
          </Checkbox.Group>
        </Flex>
      </Paper>

      <Paper withBorder radius="lg" mb="lg">
        <Stack align="center" mt="sm">
          <Title order={1}>Attempt History</Title>
          <Text size="lg" color="dimmed" px="md" align="center">
            Keep practising to achieve mastery in all topics!
          </Text>
          <RingProgress
            size={220}
            thickness={15}
            roundCaps
            sections={[
              {
                value: (numEasy / filteredAttempts.length) * 100,
                color: theme.colors.teal[5],
                tooltip: `${numEasy} Easy`,
              },
              {
                value: (numMedium / filteredAttempts.length) * 100,
                color: theme.colors.yellow[5],
                tooltip: `${numMedium} Medium`,
              },
              {
                value: (numHard / filteredAttempts.length) * 100,
                color: theme.colors.red[5],
                tooltip: `${numHard} Hard`,
              },
            ]}
            label={
              <Center>
                <RingProgress
                  size={150}
                  thickness={15}
                  sections={[
                    {
                      value: (numCorrectAttempts / filteredAttempts.length) * 100,
                      color: theme.colors.green[7],
                      tooltip: `${numCorrectAttempts} Correct`,
                    },
                    {
                      value:
                        100 - (numCorrectAttempts / filteredAttempts.length) * 100,
                      color: theme.colors.red[7],
                      tooltip: `${filteredAttempts.length - numCorrectAttempts
                        } Incorrect`,
                    },
                  ]}
                  label={
                    <Tooltip
                      label={`${numCorrectAttempts} Correct out of ${filteredAttempts.length} Total Attempts`}
                    >
                      <Text weight={700} size="xl" align="center">
                        {numCorrectAttempts}{" "}
                        <Text span color="dimmed">
                          / {filteredAttempts.length}
                        </Text>
                      </Text>
                    </Tooltip>
                  }
                />
              </Center>
            }
          />
        </Stack>
      </Paper>

      {filteredAttempts.length === 0 ? (
        <Center>
          <Text color="dimmed">No attempts match the current filters.</Text>
        </Center>
      ) : (
        filteredAttempts.map((attempt) => (
          <Paper
            withBorder
            radius="lg"
            className={`${classes.card} ${attempt.isCorrect ? classes.correct : classes.wrong
              }`}
            mb="xl"
            key={attempt.attemptId}
          >
            <Group w="70vw">
              <QuestionDifficultyBadge
                questionDifficulty={
                  attempt.questionWithAddedTime.question.questionDifficulty
                }
                {...{ radius: "lg", size: "md" }}
              />
              <Badge radius="lg" size="md">
                {attempt.questionWithAddedTime.question.topic.topicName}
              </Badge>
            </Group>
            <Text className={classes.title} size="sm" mt="lg" c="dimmed">
              {new Date(attempt.submittedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Text>
            <div
              className="rawhtml py-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  attempt.questionWithAddedTime.question.questionContent,
                  {
                    ADD_TAGS: ["iframe"],
                    ADD_ATTR: [
                      "allow",
                      "allowfullscreen",
                      "frameborder",
                      "scrolling",
                    ],
                  }
                ),
              }}
            />
            <VariablesBox
              variables={
                attempt.questionWithAddedTime
                  .variables as QuestionDataType["variables"]
              }
            />
            {attempt.questionWithAddedTime.answers ? (
              Object.entries(attempt.questionWithAddedTime.answers).map(([key, ans]) => (
                <Flex
                  gap="sm"
                  key={key}
                  className={`my-2 ${classes.options} ${Array.isArray(attempt.attemptedKeys) && attempt.attemptedKeys.includes(ans.key)
                    ? classes.selected
                    : ""
                    }`}
                >
                  {masteryLevel >= 95 ? (
                    ans.isCorrect === true ? (
                      <IconCheck color="green" size={30} stroke={3} />
                    ) : (
                      <IconX color="red" size={30} stroke={3} />
                    )
                  ) : null}
                  {ans.isLatex ? (
                    <Latex>{`$$ ${ans.answerContent} $$`}</Latex>
                  ) : (
                    <Text>{ans.answerContent}</Text>
                  )}
                </Flex>
              ))
            ) : (
              <Text>No answers available.</Text>
            )}

            {masteryLevel >= 95 && (
              attempt.questionWithAddedTime.question.questionData as QuestionDataType
            ).methods && (
                <>
                  <Divider my="xl" variant="dashed" />
                  <Accordion variant="contained" radius="md">
                    <Accordion.Item value="solution">
                      <Accordion.Control>Solution</Accordion.Control>
                      <Accordion.Panel>
                        <Stack>
                          {(
                            attempt.questionWithAddedTime.question
                              .questionData as QuestionDataType
                          ).methods.map((method, index) => (
                            <Stack
                              key={index}
                              spacing="md"
                              p="md"
                              className={
                                theme.colorScheme === "dark"
                                  ? "rounded-md bg-gray-700"
                                  : "rounded-md bg-gray-100"
                              }
                            >
                              <Flex gap="md" align="center">
                                <Text color="dimmed">#{index + 1}</Text>
                                <Box
                                  sx={{ flex: 2, alignSelf: "stretch" }}
                                  className={`flex items-center justify-center rounded-md border border-solid ${theme.colorScheme === "dark"
                                    ? "border-slate-800 bg-slate-800"
                                    : "border-slate-300 bg-slate-200"
                                    } py-1.5`}
                                >
                                  <Latex>{`$$ ${method.expr} $$`}</Latex>
                                </Box>
                              </Flex>
                              {method.explanation !== undefined && (
                                <Flex gap="md" align="center">
                                  <IconHelp stroke={1.5} size={20} />
                                  <Text sx={{ flex: 1 }} fz="sm">
                                    {method.explanation}
                                  </Text>
                                </Flex>
                              )}
                            </Stack>
                          ))
                          }
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </>
              )}
          </Paper>
        ))
      )}
    </>
  );
};

export default QuestionHistory;

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xl,
    borderLeft: `20px solid`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
  },
  correct: {
    borderLeftColor:
      theme.colorScheme === "dark"
        ? theme.colors.teal[7]
        : theme.colors.teal[4],
  },
  wrong: {
    borderLeftColor:
      theme.colorScheme === "dark" ? theme.colors.red[7] : theme.colors.red[4],
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  image: {
    filter: theme.colorScheme === "dark" ? "invert(1)" : "none",
  },
  options: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
  },
  selected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[7]
        : theme.colors.gray[3],
  },
}));