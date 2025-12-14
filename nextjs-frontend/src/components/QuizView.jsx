// nextjs-frontend/src/components/QuizView.jsx

"use client";

import React, { useState } from 'react';

export default function QuizView({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div className="text-center py-8">No questions available for this quiz.</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;

  const handleOptionSelect = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <div className="text-lg font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <h2 className="text-xl font-bold mb-6">{currentQuestion.question_text}</h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`block w-full text-left p-3 border rounded-md transition-colors duration-200
              ${selectedAnswer === index
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={isLastQuestion}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLastQuestion ? 'Submit Quiz' : 'Next'}
        </button>
      </div>

      {!isLastQuestion && <div className="mt-4 text-sm text-gray-500 text-center">
        (Note: Quiz submission will be implemented in a future story)
      </div>}
    </div>
  );
}
