'use client';

import React from 'react';
import DifficultyToggle from './DifficultyToggle'; // Import DifficultyToggle

export default function SummaryDisplay({ summary, loading, error, currentDifficulty, setDifficulty }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <DifficultyToggle currentDifficulty={currentDifficulty} setDifficulty={setDifficulty} /> {/* Render DifficultyToggle */}
        <p className="text-xl mt-4">Loading summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-red-500">
        <DifficultyToggle currentDifficulty={currentDifficulty} setDifficulty={setDifficulty} /> {/* Render DifficultyToggle */}
        <p className="text-xl mt-4">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <DifficultyToggle currentDifficulty={currentDifficulty} setDifficulty={setDifficulty} /> {/* Render DifficultyToggle */}
      </div>
      <p className="text-lg leading-relaxed">{summary}</p>
    </div>
  );
}
