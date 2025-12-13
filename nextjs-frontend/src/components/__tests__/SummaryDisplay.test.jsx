import { render, screen } from '@testing-library/react';
import SummaryDisplay from '../SummaryDisplay';
import '@testing-library/jest-dom';
import DifficultyToggle from '../DifficultyToggle'; // Import to mock it

// Mock the DifficultyToggle component
jest.mock('../DifficultyToggle', () => {
  return jest.fn((props) => (
    <div data-testid="mock-difficulty-toggle" data-current-difficulty={props.currentDifficulty}>
      Mock Difficulty Toggle
    </div>
  ));
});

describe('SummaryDisplay', () => {
  const mockContentId = 'test-content-id';
  const mockSummary = 'This is a test summary content. It is meant to be long enough to potentially trigger a scrollbar if the container has a fixed height. This text should demonstrate that the component can render extensive content without issues, ensuring readability and user experience even for verbose summaries.';
  const mockSetDifficulty = jest.fn();

  beforeEach(() => {
    // Clear mock before each test
    DifficultyToggle.mockClear();
  });

  it('renders loading state correctly and includes DifficultyToggle', () => {
    render(
      <SummaryDisplay
        loading={true}
        summary={null}
        error={null}
        contentId={mockContentId}
        currentDifficulty="medium"
        setDifficulty={mockSetDifficulty}
      />
    );
    expect(screen.getByText('Loading summary...')).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toHaveAttribute('data-current-difficulty', 'medium');
  });

  it('renders error state correctly and includes DifficultyToggle', () => {
    const errorMessage = 'Failed to load summary';
    render(
      <SummaryDisplay
        loading={false}
        summary={null}
        error={errorMessage}
        contentId={mockContentId}
        currentDifficulty="hard"
        setDifficulty={mockSetDifficulty}
      />
    );
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toHaveAttribute('data-current-difficulty', 'hard');
  });

  it('renders summary content correctly and includes DifficultyToggle', () => {
    render(
      <SummaryDisplay
        loading={false}
        summary={mockSummary}
        error={null}
        contentId={mockContentId}
        currentDifficulty="easy"
        setDifficulty={mockSetDifficulty}
      />
    );
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText(mockSummary)).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('mock-difficulty-toggle')).toHaveAttribute('data-current-difficulty', 'easy');
  });

  it('applies scrollbar styles for long content (snapshot test for className)', () => {
    const { container } = render(
      <SummaryDisplay
        loading={false}
        summary={mockSummary}
        error={null}
        contentId={mockContentId}
        currentDifficulty="medium"
        setDifficulty={mockSetDifficulty}
      />
    );
    const summaryContainer = container.querySelector('.overflow-y-auto');
    expect(summaryContainer).toBeInTheDocument();
    expect(summaryContainer).toHaveClass('max-h-96');
  });
});
