// nextjs-frontend/src/app/quiz/[quizId]/page.jsx

"use client"; // This is a client component

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getQuiz } from '../../../lib/api';
import QuizView from '../../../components/QuizView';

export default function QuizPage() {
  const { quizId } = useParams(); // Correctly get the dynamic parameter
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      // Let's assume a default difficulty for now
      const difficulty = 'medium';
      setLoading(true);
      setError(null);
      try {
        const data = await getQuiz(quizId, difficulty);
        setQuizData(data);
      } catch (err) {
        setError("Failed to load quiz: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
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
