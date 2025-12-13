import { render, screen, fireEvent } from '@testing-library/react';
import DifficultyToggle from '../DifficultyToggle';
import '@testing-library/jest-dom';

describe('DifficultyToggle', () => {
  it('renders all difficulty options', () => {
    const setDifficulty = jest.fn();
    render(<DifficultyToggle currentDifficulty="medium" setDifficulty={setDifficulty} />);
    expect(screen.getByRole('button', { name: 'Easy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hard' })).toBeInTheDocument();
  });

  it('calls setDifficulty with the correct value when a button is clicked', () => {
    const setDifficulty = jest.fn();
    render(<DifficultyToggle currentDifficulty="medium" setDifficulty={setDifficulty} />);
    
    const easyButton = screen.getByRole('button', { name: 'Easy' });
    fireEvent.click(easyButton);
    expect(setDifficulty).toHaveBeenCalledWith('easy');

    const hardButton = screen.getByRole('button', { name: 'Hard' });
    fireEvent.click(hardButton);
    expect(setDifficulty).toHaveBeenCalledWith('hard');
  });

  it('applies active styles to the current difficulty', () => {
    const setDifficulty = jest.fn();
    const { rerender } = render(<DifficultyToggle currentDifficulty="medium" setDifficulty={setDifficulty} />);
    
    const mediumButton = screen.getByRole('button', { name: 'Medium' });
    expect(mediumButton).toHaveClass('bg-blue-500');

    const easyButton = screen.getByRole('button', { name: 'Easy' });
    expect(easyButton).not.toHaveClass('bg-blue-500');

    // Re-render with a new difficulty
    rerender(<DifficultyToggle currentDifficulty="hard" setDifficulty={setDifficulty} />);
    const hardButton = screen.getByRole('button', { name: 'Hard' });
    expect(hardButton).toHaveClass('bg-blue-500');
    expect(screen.getByRole('button', { name: 'Medium' })).not.toHaveClass('bg-blue-500');
  });
});
