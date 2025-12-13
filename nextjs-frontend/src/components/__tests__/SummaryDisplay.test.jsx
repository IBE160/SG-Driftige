import { render, screen } from '@testing-library/react';
import SummaryDisplay from '../SummaryDisplay';
import '@testing-library/jest-dom';

describe('SummaryDisplay', () => {
  const mockContentId = 'test-content-id';
  const mockSummary = 'This is a test summary content. It is meant to be long enough to potentially trigger a scrollbar if the container has a fixed height. This text should demonstrate that the component can render extensive content without issues, ensuring readability and user experience even for verbose summaries.';

  it('renders loading state correctly', () => {
    render(<SummaryDisplay loading={true} summary={null} error={null} contentId={mockContentId} />);
    expect(screen.getByText('Loading summary...')).toBeInTheDocument();
    expect(screen.queryByText(/Summary for Content ID/)).not.toBeInTheDocument();
    expect(screen.queryByText(mockSummary)).not.toBeInTheDocument();
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to load summary';
    render(<SummaryDisplay loading={false} summary={null} error={errorMessage} contentId={mockContentId} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByText('Loading summary...')).not.toBeInTheDocument();
    expect(screen.queryByText(/Summary for Content ID/)).not.toBeInTheDocument();
    expect(screen.queryByText(mockSummary)).not.toBeInTheDocument();
  });

  it('renders summary content correctly', () => {
    render(<SummaryDisplay loading={false} summary={mockSummary} error={null} contentId={mockContentId} />);
    expect(screen.getByText('Summary')).toBeInTheDocument(); // Title is now just "Summary"
    expect(screen.getByText(mockSummary)).toBeInTheDocument();
    expect(screen.queryByText('Loading summary...')).not.toBeInTheDocument();
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  it('applies scrollbar styles for long content (snapshot test for className)', () => {
    const { container } = render(<SummaryDisplay loading={false} summary={mockSummary} error={null} contentId={mockContentId} />);
    // Check if the div intended for scrollbar has the correct class
    const summaryContainer = container.querySelector('.overflow-y-auto');
    expect(summaryContainer).toBeInTheDocument();
    expect(summaryContainer).toHaveClass('max-h-96'); // Verify max-height class for scrollbar
  });
});
