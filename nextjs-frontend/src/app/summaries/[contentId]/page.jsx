'use client';

import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useParams, useRouter } from 'next/navigation';
import SummaryDisplay from '../../../components/SummaryDisplay';
import { fetchSummary, getQuiz } from '../../../lib/api';

export default function SummaryPage() {
  const { contentId } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [quizGenerationInitiated, setQuizGenerationInitiated] = useState(false); // New state variable

  console.log('SummaryPage - Render: contentId', contentId, 'summary', summary, 'loading', loading, 'error', error); // Log every render


  useEffect(() => {
    async function getAndSetSummary() {
      if (!contentId) return;

      setLoading(true);
      setError(null);
      console.log('SummaryPage - useEffect: Fetching summary for', contentId, 'difficulty', difficulty);
      try {
        const summaryText = await fetchSummary(contentId, difficulty);
        setSummary(summaryText);
        console.log('SummaryPage - useEffect: Summary fetched:', summaryText);
      } catch (err) {
        setError(err.message);
        console.error('SummaryPage - useEffect: Error fetching summary:', err.message);
      } finally {
        setLoading(false);
        console.log('SummaryPage - useEffect: Loading finished.');
      }
    }

    getAndSetSummary();
  }, [contentId, difficulty]);

  const router = useRouter();

  const handleGenerateQuiz = useCallback(async () => { // Wrapped in useCallback
    if (quizGenerationInitiated || !contentId || loading || error) return; // Add guard for quizGenerationInitiated

    setQuizGenerationInitiated(true); // Set to true to prevent further calls
    setLoading(true);
    setError(null);
    console.log('handleGenerateQuiz: Generating quiz for contentId:', contentId, 'difficulty:', difficulty);
    try {
      const quizData = await getQuiz(contentId, difficulty);
      console.log('handleGenerateQuiz: QuizData received:', quizData);
      router.push(`/quiz/${quizData.quiz_id}`);
    } catch (err) {
      setError(err.message);
      alert(`Error generating quiz: ${err.message}`);
      setLoading(false); // Keep this if we want to allow retry after error on the same page
      setQuizGenerationInitiated(false); // Allow retry after error
    }
  }, [contentId, loading, error, difficulty, router, quizGenerationInitiated]); // Add quizGenerationInitiated to dependencies

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Summary for Content ID: {contentId}</h1>
      {/* Re-added difficulty props to SummaryDisplay */}
      <SummaryDisplay summary={summary} loading={loading} error={error} currentDifficulty={difficulty} setDifficulty={setDifficulty} />
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handleGenerateQuiz}
          className="px-8 py-3 bg-[#A8DADC] text-black font-bold rounded-xl shadow-lg hover:bg-[#90C2C3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8DADC] transition disabled:opacity-50"
          disabled={loading || error || !summary || quizGenerationInitiated} // Disable button while quiz generation is initiated
        >
          Generate Quiz for {difficulty} summary
        </button>
      </div>
    </div>
  );
}
