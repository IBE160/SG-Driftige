'use client';

import React from 'react';
import PropTypes from 'prop-types';

const QuizResults = ({ quizResult, onPracticeWeakSpots }) => {
  if (!quizResult) {
    return <div className="text-center p-4">No quiz results to display.</div>;
  }

  const { score, correct_answers, total_questions, results } = quizResult;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Quiz Results</h2>
      
      <div className="text-center mb-6">
        <p className="text-xl text-gray-700">You scored:</p>
        <p className="text-5xl font-extrabold text-blue-600">{score.toFixed(0)}%</p>
        <p className="text-2xl text-gray-700 mt-2">
          {correct_answers} out of {total_questions} correct
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Breakdown:</h3>
        <ul className="space-y-2">
          {Object.entries(results).map(([questionIndex, isCorrect]) => (
            <li 
              key={questionIndex} 
              className={`p-3 rounded-md flex items-center justify-between 
                          ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
            >
              <span className="font-medium">Question {parseInt(questionIndex) + 1}</span>
              {isCorrect ? (
                <span className="font-bold">Correct</span>
              ) : (
                <span className="font-bold">Incorrect</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {score < 100 && (
        <div className="mt-8 text-center">
            <button
                onClick={onPracticeWeakSpots}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
                Practice Weak Spots
            </button>
        </div>
      )}
    </div>
  );
};

QuizResults.propTypes = {
  quizResult: PropTypes.shape({
    score: PropTypes.number.isRequired,
    correct_answers: PropTypes.number.isRequired,
    total_questions: PropTypes.number.isRequired,
    results: PropTypes.objectOf(PropTypes.bool).isRequired,
  }),
  onPracticeWeakSpots: PropTypes.func.isRequired,
};

export default QuizResults;