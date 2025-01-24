import { Button, Center, Text, Box, Stack, Paper, Group } from '@mantine/core'
import { IconInfoCircle, IconListCheck, IconZoomQuestion } from '@tabler/icons'
import { IconClockSearch } from '@tabler/icons-react'
import React from 'react'

interface Props {
  active: string
  attemptHistoryLocked: boolean
  setConfirmationModalOpened: (arg0: boolean) => void
}

const QuizStartButton = ({ active, attemptHistoryLocked, setConfirmationModalOpened }: Props) => {
  return (
    <div>
      {active === 'Question' && !attemptHistoryLocked && (
        <Center mb="md">
          <Paper
            shadow="md"
            radius="lg"
            withBorder
            p="lg"
            sx={(theme) => ({
              maxWidth: '600px',
              width: '100%',
              backgroundColor: theme.colors.gray[0],
            })}
          >
            <Stack spacing="lg" align="center">
              <IconZoomQuestion
                size={70}
                stroke={1.5}
                color="blue"
              />

              <Stack spacing="xs" align="center">
                <Text size="xl" weight={600} color="dark">
                  Start Your Quiz Session
                </Text>
                <Text color="dimmed" align="center">
                  Begin your assessment and test your knowledge
                </Text>
              </Stack>

              <Group spacing="xs" align="flex-start" position="center">
                <IconInfoCircle size={20} color="gray" stroke={1.5} />
                <Text size="sm" color="dimmed">
                  Attempt History and Course Materials will be locked for 5 minutes once started
                </Text>
              </Group>

              <Stack spacing="sm" w="100%">
                <Box>
                  <Group spacing="xs" mb="xs">
                    <IconListCheck size={18} color="green" stroke={1.5} />
                    <Text size="sm">Timed assessment</Text>
                  </Group>
                  <Group spacing="xs" mb="xs">
                    <IconClockSearch size={18} color="orange" stroke={1.5} />
                    <Text size="sm">Single attempt per session</Text>
                  </Group>
                </Box>

                <Button
                  onClick={() => setConfirmationModalOpened(true)}
                  fullWidth
                  size="md"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                  leftIcon={<IconZoomQuestion size={20} />}
                >
                  Start Quiz Session
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Center>
      )}
    </div>
  )
}

export default QuizStartButton