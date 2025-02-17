import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { QuestionDifficulty } from '@prisma/client';

interface TopicMasteryData {
  topicName: string;
  topicSlug: string;
  masteryLevel: number;
  streakCorrect: number;
  streakIncorrect: number;
  lastDifficulty: QuestionDifficulty | null;
  period: string;
}

interface MasteryResponse {
  data: TopicMasteryData;
  message?: string;
}

const useTopicMastery = (studentId: string, topicSlug: string, period: string) => {
  const [mastery, setMastery] = useState<TopicMasteryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMastery = useCallback(async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<MasteryResponse>('/api/user/getMasteryGivenTopic', {
        params: {
          student_id: studentId,
          topic_slug: topicSlug,
          period,
        },
        signal,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Request failed');
      }

      setMastery(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request aborted:', err.message);
        return;
      }

      let errorMessage = 'Failed to fetch mastery data';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(new Error(errorMessage));
      console.error('Failed to fetch topic mastery data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [studentId, topicSlug, period]);

  useEffect(() => {
    const controller = new AbortController();
    fetchMastery(controller.signal);
    return () => controller.abort();
  }, [fetchMastery]);

  return { mastery, isLoading, error, retry: fetchMastery };
};

export default useTopicMastery;