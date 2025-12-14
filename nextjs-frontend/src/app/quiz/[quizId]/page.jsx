// nextjs-frontend/src/app/quiz/[quizId]/page.jsx

"use client"; // This is a client component

import React, { useState, useEffect } from 'react';
// import { getQuiz } from '../../../lib/api'; // Task 3 will implement this
import QuizView from '../../../components/QuizView'; // Import the QuizView component

export default function QuizPage({ params }) {
  const { quizId } = params;
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This will be implemented in Task 3
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        // const data = await getQuiz(quizId);
        // setQuizData(data);
        // Mock data for now until Task 3 is complete
        setQuizData({
            quiz_id: quizId,
            questions: [
                {
                    question_text: "What is the capital of France?",
                    options: ["London", "Paris", "Berlin", "Madrid"],
                    correct_answer_index: 1,
                },
                {
                    question_text: "What is 2 + 2?",
                    options: ["3", "4", "5", "6"],
                    correct_answer_index: 1,
                },
            ],
        });
      } catch (err) {
        setError("Failed to load quiz: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  if (loading) {
    return <div className="text-center py-8">Loading Quiz...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!quizData) {
    return <div className="text-center py-8">No quiz data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz: {quizId}</h1>
      <QuizView quizData={quizData} />
    </div>
  );
}
