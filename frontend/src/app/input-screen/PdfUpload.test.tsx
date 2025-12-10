import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PdfUpload from './PdfUpload';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../../../theme';

describe('PdfUpload', () => {
  it('renders the upload button and drag-and-drop zone', () => {
    render(
      <ChakraProvider value={system}>
        <PdfUpload />
      </ChakraProvider>
    );
    expect(screen.getByText('Drag and drop your PDF here, or')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload pdf/i })).toBeInTheDocument();
  });

  it('allows a file to be selected and displays the filename', () => {
    render(
      <ChakraProvider value={system}>
        <PdfUpload />
      </ChakraProvider>
    );
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('pdf-upload-input');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('Selected file: hello.pdf')).toBeInTheDocument();
  });

  it('logs the file to the console when generate is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(
      <ChakraProvider value={system}>
        <PdfUpload />
      </ChakraProvider>
    );
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('pdf-upload-input');
    fireEvent.change(input, { target: { files: [file] } });

    const generateButton = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateButton);

    expect(consoleSpy).toHaveBeenCalledWith('Preparing to process the following file:');
    expect(consoleSpy).toHaveBeenCalledWith(file);
    consoleSpy.mockRestore();
  });
});
