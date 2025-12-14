// nextjs-frontend/src/components/__tests__/QuizResults.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizResults from '../QuizResults';

describe('QuizResults', () => {
  const mockQuizResultAllCorrect = {
    score: 100,
    correct_answers: 3,
    total_questions: 3,
    results: {
      0: true,
      1: true,
      2: true,
    },
  };

  const mockQuizResultPartialCorrect = {
    score: 66.67,
    correct_answers: 2,
    total_questions: 3,
    results: {
      0: true,
      1: false,
      2: true,
    },
  };

  const mockQuizResultAllIncorrect = {
    score: 0,
    correct_answers: 0,
    total_questions: 3,
    results: {
      0: false,
      1: false,
      2: false,
    },
  };

  test('renders with all correct answers', () => {
    render(<QuizResults quizResult={mockQuizResultAllCorrect} />);

    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.getByText('You scored:')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('3 out of 3 correct')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Question 3')).toBeInTheDocument();
    expect(screen.getAllByText('Correct').length).toBe(3);
    expect(screen.queryByText('Incorrect')).not.toBeInTheDocument();
  });

  test('renders with partially correct answers', () => {
    render(<QuizResults quizResult={mockQuizResultPartialCorrect} />);

    expect(screen.getByText('67%')).toBeInTheDocument(); // Rounded score
    expect(screen.getByText('2 out of 3 correct')).toBeInTheDocument();
    expect(screen.getAllByText('Correct').length).toBe(2);
    expect(screen.getAllByText('Incorrect').length).toBe(1);
  });

  test('renders with all incorrect answers', () => {
    render(<QuizResults quizResult={mockQuizResultAllIncorrect} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('0 out of 3 correct')).toBeInTheDocument();
    expect(screen.queryByText('Correct')).not.toBeInTheDocument();
    expect(screen.getAllByText('Incorrect').length).toBe(3);
  });

  test('renders correctly when quizResult is null', () => {
    render(<QuizResults quizResult={null} />);
    expect(screen.getByText('No quiz results to display.')).toBeInTheDocument();
  });
});