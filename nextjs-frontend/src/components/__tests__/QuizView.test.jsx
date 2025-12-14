// nextjs-frontend/src/components/__tests__/QuizView.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizView from '../QuizView';

const mockQuizData = {
  quiz_id: '123',
  questions: [
    {
      question_text: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct_answer_index: 1,
    },
    {
      question_text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct_answer_index: 1,
    },
  ],
};

describe('QuizView', () => {
  const mockOnAnswersChange = jest.fn();
  const mockOnSubmitQuiz = jest.fn();

  beforeEach(() => {
    mockOnAnswersChange.mockClear();
    mockOnSubmitQuiz.mockClear();
  });

  it('renders the first question and its options', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(mockOnAnswersChange).toHaveBeenCalledWith({}, false); // Initial call with empty answers
  });

  it('handles answer selection and calls onAnswersChange', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    fireEvent.click(screen.getByText('Paris'));
    expect(screen.getByText('Paris')).toHaveClass('bg-blue-500');
    expect(mockOnAnswersChange).toHaveBeenCalledWith({ 0: 1 }, false); // Called with updated answers
  });

  it('navigates to the next question', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('navigates to the previous question', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('previous-button'));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('disables the "Previous" button on the first question', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    expect(screen.getByTestId('previous-button')).toBeDisabled();
  });
  
it('does not show a submit button (it is handled by parent)', () => {
    render(<QuizView quizData={mockQuizData} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    expect(screen.queryByTestId('submit-quiz-button')).not.toBeInTheDocument();
  });

  it('shows a message if no quiz data is provided', () => {
    render(<QuizView quizData={null} onAnswersChange={mockOnAnswersChange} onSubmitQuiz={mockOnSubmitQuiz} />);
    expect(screen.getByText('No questions available for this quiz.')).toBeInTheDocument();
    expect(mockOnAnswersChange).toHaveBeenCalledWith({}, false); // Expect to be called with empty answers
    expect(mockOnSubmitQuiz).not.toHaveBeenCalled();
  });
});

