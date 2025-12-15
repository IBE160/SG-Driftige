"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { fetchQuizById, submitQuiz, getAdaptiveQuiz } from "../../../lib/api"; // Changed getQuiz to fetchQuizById
import QuizView from "../../../components/QuizView";
import QuizResults from "../../../components/QuizResults";

export default function QuizPage() {
  const { quizId } = useParams(); // Correctly get quizId

  const [quizData, setQuizData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------
  // Initial quiz load
  // ----------------------------
  useEffect(() => {
    if (!quizId) return; // Use quizId directly

    const fetchAndSetQuiz = async () => { // Renamed function for clarity
      setLoading(true);
      setError(null);

      try {
        const data = await fetchQuizById(quizId); // Call the new fetchQuizById (GET)
        setQuizData(data);
      } catch (err) {
        setError(`Failed to load quiz: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetQuiz();
  }, [quizId]); // Dependency is quizId

  // ----------------------------
  // Quiz interaction handlers
  // ----------------------------
  const handleAnswersChange = useCallback((answers, allAnswered) => {
    setUserAnswers(answers);
    setAllQuestionsAnswered(allAnswered);
  }, []);

  const handleSubmitQuiz = useCallback(async () => {
    if (!quizData?.quiz_id) {
      setError("Quiz data or ID missing for submission.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await submitQuiz(quizData.quiz_id, {
        answers: userAnswers,
      });
      setQuizResult(result);
    } catch (err) {
      setError(`Failed to submit quiz: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [quizData, userAnswers]);

  // Adaptive quiz: practice weak spots
  const handlePracticeWeakSpots = useCallback(async () => {
    if (!quizData?.quiz_id || !quizResult) {
      setError(
        "Cannot generate adaptive quiz without a previous result and quiz ID."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("handlePracticeWeakSpots: quizData.quiz_id:", quizData.quiz_id);
      console.log("handlePracticeWeakSpots: quizData.content_id:", quizData.content_id);
      console.log("handlePracticeWeakSpots: quizResult being sent:", quizResult); // Add this log

      const newQuiz = await getAdaptiveQuiz(
        quizData.quiz_id,
        quizData.content_id, // This is the content ID
        quizResult
      );

      // ⚡ Update quizData first, then reset answers/result
      setQuizData(newQuiz);
      setUserAnswers({});
      setAllQuestionsAnswered(false);
      setQuizResult(null);

    } catch (err) {
      setError(`Failed to generate adaptive quiz: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [quizData, quizResult]);

  // ----------------------------
  // Render states
  // ----------------------------
  if (loading) {
    return <div className="text-center py-8">Loading Quiz...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">Error: {error}</div>
    );
  }

  if (!quizData) {
    return <div className="text-center py-8">No quiz data available.</div>;
  }

  // Show results or quiz
  if (quizResult) {
    return (
      <div className="container mx-auto p-4">
        <QuizResults
          quizResult={quizResult}
          onPracticeWeakSpots={handlePracticeWeakSpots}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz: {quizId}</h1>

      <QuizView
        quizData={quizData}
        onAnswersChange={handleAnswersChange}
        onSubmitQuiz={handleSubmitQuiz}
      />

      {allQuestionsAnswered && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmitQuiz}
            data-testid="page-submit-quiz-button"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
          >
            Submit All Answers
          </button>
        </div>
      )}
    </div>
  );
}