'use client';

import React from 'react';

const DifficultyToggle = ({ currentDifficulty, setDifficulty }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  const getButtonClass = (difficulty) => {
    const baseClass = 'px-4 py-2 rounded-md font-semibold transition-colors';
    if (difficulty === currentDifficulty) {
      return `${baseClass} bg-blue-500 text-white shadow-md`;
    }
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => setDifficulty(difficulty)}
          className={getButtonClass(difficulty)}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultyToggle;
