'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SummaryDisplay from '../../../components/SummaryDisplay'; // Corrected path
import { fetchSummary } from '../../../lib/api'; // Import the API utility

export default function SummaryPage() {
  const { contentId } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('medium'); // Default difficulty

  console.log('SummaryPage - Render: contentId', contentId, 'summary', summary, 'loading', loading, 'error', error);


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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Summary for Content ID: {contentId}</h1>
      <SummaryDisplay summary={summary} loading={loading} error={error} currentDifficulty={difficulty} setDifficulty={setDifficulty} />
    </div>
  );
}
