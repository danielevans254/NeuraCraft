import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, BookOpen } from 'lucide-react';

interface Attempt {
  id: string;
  isCorrect: boolean;
  submittedAt: Date;
  questionId: string;
  topicSlug: string;
}

interface Recommendation {
  recommendationUrl?: string;
  message: string;
  recommendedTopic?: string;
  currentMastery?: number;
  previousPeakMastery?: number;
  confidenceScore?: number;
  alternatives?: string[];
  mediaType?: 'PDF' | 'video' | 'quiz';
  reason?: string;
  pageNumber?: number;
}

interface PracticeRecommendationModalProps {
  courseSlug: string;
  currentTopicSlug: string;
  attempts: Attempt[];
  onClose: () => void;
  onResourceView: (url: string) => void;
  masteryThreshold?: number;
  consecutiveErrorsThreshold?: number;
  minAttemptsBeforeRecommendation?: number;
  confidenceScoreThreshold?: number;
  onRecommendationShown?: (recommendation: Recommendation) => void;
  onRecommendationDismissed?: () => void;
  onRecommendationError?: (error: Error) => void;
  customModalTitle?: string;
  customContinueText?: string;
  customReviewText?: string;
  hidePerformanceMetrics?: boolean;
  hideAlternatives?: boolean;
  autoFetch?: boolean;
  disableAutoShow?: boolean;
  forceShow?: boolean;
}

export default function PracticeRecommendationModal({
  courseSlug,
  currentTopicSlug,
  attempts,
  onClose,
  onResourceView,
  masteryThreshold = 0.7,
  consecutiveErrorsThreshold = 2,
  minAttemptsBeforeRecommendation = 3,
  confidenceScoreThreshold = 0.6,
  onRecommendationShown,
  onRecommendationDismissed,
  onRecommendationError,
  customModalTitle = 'Review Recommended',
  customContinueText = 'Continue Practice',
  customReviewText = 'Review Material',
  hidePerformanceMetrics = false,
  hideAlternatives = false,
  autoFetch = true,
  disableAutoShow = false,
  forceShow = false,
}: PracticeRecommendationModalProps) {
  const [open, setOpen] = useState(forceShow);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (forceShow && !open) {
      setOpen(true);
    }
  }, [forceShow]);

  useEffect(() => {
    if (autoFetch) {
      checkPerformance();
    }
  }, [attempts, currentTopicSlug]);

  const checkPerformance = async () => {
    if (!Array.isArray(attempts) || attempts.length === 0) return;

    const recentAttempts = attempts
      .filter(a => a.topicSlug === currentTopicSlug)
      .slice(-minAttemptsBeforeRecommendation);

    const consecutiveErrors = recentAttempts.filter(a => !a.isCorrect).length;

    if (recentAttempts.length >= minAttemptsBeforeRecommendation &&
      consecutiveErrors >= consecutiveErrorsThreshold) {
      await fetchRecommendation();
    }
  };

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/recommendations?courseSlug=${courseSlug}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: Recommendation = await response.json();
      if (data.confidenceScore && data.confidenceScore > confidenceScoreThreshold) {
        setRecommendation(data);
        if (!disableAutoShow) setOpen(true);
        onRecommendationShown?.(data);
      }
    } catch (error) {
      console.error('Failed to fetch recommendation:', error);
      onRecommendationError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onRecommendationDismissed?.();
    onClose();
  };

  const handleViewResource = () => {
    if (recommendation?.recommendationUrl) {
      onResourceView(recommendation.recommendationUrl);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{customModalTitle}</h2>
        <p className="mt-2">{recommendation?.message}</p>

        {recommendation && (
          <>
            <div className="mt-4 p-4 border-l-4 border-yellow-500 bg-yellow-100">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="font-bold">Why this recommendation?</p>
              </div>
              <p className="mt-2">{recommendation.reason}</p>
              {!hidePerformanceMetrics && recommendation.currentMastery && (
                <p className="mt-2">
                  Current mastery: {(recommendation.currentMastery * 100).toFixed(1)}%
                  {recommendation.previousPeakMastery && (
                    <span className="ml-2">(Peak: {(recommendation.previousPeakMastery * 100).toFixed(1)}%)</span>
                  )}
                </p>
              )}
            </div>
            {!hideAlternatives && recommendation?.alternatives?.length > 0 && (
              <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-100">
                <p className="font-bold">Alternative Topics</p>
                <ul className="list-disc pl-4 mt-2">
                  {recommendation?.alternatives.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded-md">{customContinueText}</button>
          <button onClick={handleViewResource} className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />{customReviewText}
          </button>
        </div>
      </div>
    </div>
  );
}