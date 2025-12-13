import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputForm from '../InputForm';
import * as api from '../../lib/api';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../lib/api', () => ({
  submitText: jest.fn(),
}));

describe('InputForm', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    alertMock.mockClear();
    api.submitText.mockClear();
  });

  it('should render a text area and a disabled button', () => {
    render(<InputForm />);
    expect(screen.getByPlaceholderText('Paste your notes or text here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeDisabled();
  });

  it('should enable the button when text is entered', () => {
    render(<InputForm />);
    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    fireEvent.change(textArea, { target: { value: 'Some text' } });
    expect(screen.getByRole('button', { name: /generate/i })).toBeEnabled();
  });

  it('should call submitText with text and difficulty when the form is submitted', async () => {
    api.submitText.mockResolvedValue('test-content-id');
    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(textArea, { target: { value: 'Test submission' } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(api.submitText).toHaveBeenCalledWith('Test submission', 'medium');
    });
  });

  it('should show an alert on API error', async () => {
    const errorMessage = 'API is down';
    api.submitText.mockRejectedValue(new Error(errorMessage));
    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(textArea, { target: { value: 'Test submission' } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });
  
  it('should change difficulty when toggle is clicked', () => {
    render(<InputForm />);
    const hardButton = screen.getByRole('button', { name: 'Hard' });
    fireEvent.click(hardButton);
    expect(hardButton).toHaveClass('bg-blue-500');
  });
});
