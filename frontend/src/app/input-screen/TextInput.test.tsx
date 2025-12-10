import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from './TextInput';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../../../theme';

describe('TextInput', () => {
  it('renders the textarea and button', () => {
    render(
      <ChakraProvider value={system}>
        <TextInput />
      </ChakraProvider>
    );
    expect(screen.getByPlaceholderText('Paste your text here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  });

  it('allows typing in the textarea', () => {
    render(
      <ChakraProvider value={system}>
        <TextInput />
      </ChakraProvider>
    );
    const textarea = screen.getByPlaceholderText('Paste your text here') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
    expect(textarea.value).toBe('Hello, world!');
  });

  it('logs the text to the console when generate is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(
      <ChakraProvider value={system}>
        <TextInput />
      </ChakraProvider>
    );
    const textarea = screen.getByPlaceholderText('Paste your text here');
    fireEvent.change(textarea, { target: { value: 'Test text' } });
    const generateButton = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateButton);
    expect(consoleSpy).toHaveBeenCalledWith('Preparing to process the following text:');
    expect(consoleSpy).toHaveBeenCalledWith('Test text');
    consoleSpy.mockRestore();
  });
});
