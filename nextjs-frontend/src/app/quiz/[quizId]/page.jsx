// nextjs-frontend/src/app/quiz/[quizId]/page.jsx

"use client"; // This is a client component

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { getQuiz, submitQuiz, getAdaptiveQuiz } from '../../../lib/api'; // Import adaptive quiz function
import QuizView from '../../../components/QuizView';
import QuizResults from '../../../components/QuizResults'; // Import QuizResults

export default function QuizPage() {
  const { quizId: contentId } = useParams(); // Rename quizId to contentId for clarity, assuming it's the contentId
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // To store the result after submission

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!contentId) return;

      // Let's assume a default difficulty for now for quiz generation
      // In a real app, difficulty might come from a query param or user selection
      const difficulty = 'medium'; 
      setLoading(true);
      setError(null);
      try {
        const data = await getQuiz(contentId, difficulty);
        setQuizData(data);
      } catch (err) {
        setError("Failed to load quiz: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [contentId]);

  const handleAnswersChange = useCallback((answers, allAnswered) => {
    setUserAnswers(answers);
    setAllQuestionsAnswered(allAnswered);
  }, []);

  const handleSubmitQuiz = useCallback(async () => {
    if (!quizData || !quizData.quiz_id) {
      setError("Quiz data or ID missing for submission.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const submissionPayload = { answers: userAnswers };
      const result = await submitQuiz(quizData.quiz_id, submissionPayload);
      setQuizResult(result); // Store the result
    } catch (err) {
      setError("Failed to submit quiz: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [quizData, userAnswers]);

  const handlePracticeWeakSpots = useCallback(async () => {
    if (!quizResult || !quizData || !quizData.quiz_id) {
        setError("Cannot generate adaptive quiz without a previous result and quiz ID.");
        return;
    }

    setLoading(true);
    setError(null);
    try {
        const newQuiz = await getAdaptiveQuiz(quizData.quiz_id, contentId, quizResult);
        // Reset the state for the new quiz
        setQuizData(newQuiz);
        setQuizResult(null);
        setUserAnswers({});
        setAllQuestionsAnswered(false);
    } catch (err) {
        setError("Failed to generate adaptive quiz: " + err.message);
    } finally {
        setLoading(false);
    }
  }, [quizResult, quizData, contentId]);


  if (loading) {
    return <div className="text-center py-8">Loading Quiz...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!quizData) {
    return <div className="text-center py-8">No quiz data available.</div>;
  }

  // If quizResult is available, display results; otherwise, display the quiz
  if (quizResult) {
    return (
      <div className="container mx-auto p-4">
        <QuizResults quizResult={quizResult} onPracticeWeakSpots={handlePracticeWeakSpots} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz: {contentId}</h1>
      <QuizView 
        quizData={quizData} 
        onAnswersChange={handleAnswersChange} 
        onSubmitQuiz={handleSubmitQuiz}
      />
      {allQuestionsAnswered && !quizResult && ( // Show submit button only when all questions answered and no result yet
        <div className="text-center mt-6">
            <button
                onClick={handleSubmitQuiz}
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-200"
                data-testid="page-submit-quiz-button"
            >
                Submit All Answers
            </button>
        </div>
      )}
    </div>
  );
}
