// nextjs-frontend/src/components/QuizView.jsx

"use client";

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import PropTypes from 'prop-types';

export default function QuizView({ quizData, onAnswersChange, onSubmitQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }

  // Use a ref to store the last seen quiz_id
  const lastQuizIdRef = useRef(quizData?.quiz_id);

  useEffect(() => {
    // Reset state if quizData.quiz_id changes, indicating a new quiz has been loaded
    if (quizData && quizData.quiz_id !== lastQuizIdRef.current) {
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      lastQuizIdRef.current = quizData.quiz_id; // Update the ref
    }

    if (!quizData) {
      onAnswersChange({}, false);
      return;
    }
    // Notify parent about initial answer state or when answers change
    const allQuestionsAnswered = Object.keys(userAnswers).length === quizData.questions.length;
    onAnswersChange(userAnswers, allQuestionsAnswered);
  }, [userAnswers, quizData, onAnswersChange]); // Keep quizData in dependency array


  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div className="text-center py-8">No questions available for this quiz.</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const allQuestionsAnswered = Object.keys(userAnswers).length === totalQuestions;

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: optionIndex,
    };
    setUserAnswers(newAnswers);
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
          data-testid="previous-button"
        >
          Previous
        </button>
        {!isLastQuestion && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            data-testid="next-button"
          >
            Next
          </button>
        )}
        {isLastQuestion && allQuestionsAnswered && (
          <button
            onClick={onSubmitQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            data-testid="submit-quiz-button"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

QuizView.propTypes = {
  quizData: PropTypes.shape({
    quiz_id: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question_text: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correct_answer_index: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onAnswersChange: PropTypes.func.isRequired,
  onSubmitQuiz: PropTypes.func.isRequired,
};
