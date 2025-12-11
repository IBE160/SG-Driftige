import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from '../InputForm';

describe('InputForm', () => {
  it('should render a text area and a disabled button', () => {
    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    expect(textArea).toBeInTheDocument();
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toBeDisabled();
  });

  it('should enable the button when text is entered', () => {
    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(textArea, { target: { value: 'Some text' } });

    expect(generateButton).toBeEnabled();
  });

  it('should disable the button when text is cleared', () => {
    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(textArea, { target: { value: 'Some text' } });
    expect(generateButton).toBeEnabled();

    fireEvent.change(textArea, { target: { value: '' } });
    expect(generateButton).toBeDisabled();
  });

  it('should call handleSubmit when the form is submitted', () => {
    const originalLog = console.log;
    console.log = jest.fn();

    render(<InputForm />);

    const textArea = screen.getByPlaceholderText('Paste your notes or text here...');
    const generateButton = screen.getByRole('button', { name: /generate/i });

    fireEvent.change(textArea, { target: { value: 'Test submission' } });
    fireEvent.click(generateButton);

    expect(console.log).toHaveBeenCalledWith('Submitted text:', 'Test submission');

    console.log = originalLog;
  });
});
