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
  it('renders the first question and its options', () => {
    render(<QuizView quizData={mockQuizData} />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('handles answer selection', () => {
    render(<QuizView quizData={mockQuizData} />);
    fireEvent.click(screen.getByText('Paris'));
    expect(screen.getByText('Paris')).toHaveClass('bg-blue-500');
  });

  it('navigates to the next question', () => {
    render(<QuizView quizData={mockQuizData} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('navigates to the previous question', () => {
    render(<QuizView quizData={mockQuizData} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('disables the "Previous" button on the first question', () => {
    render(<QuizView quizData={mockQuizData} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables the "Next" button on the last question and shows "Submit Quiz"', () => {
    render(<QuizView quizData={mockQuizData} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Submit Quiz')).toBeInTheDocument();
    expect(screen.getByText('Submit Quiz')).toBeDisabled();
  });

  it('shows a message if no quiz data is provided', () => {
    render(<QuizView quizData={null} />);
    expect(screen.getByText('No questions available for this quiz.')).toBeInTheDocument();
  });
});
