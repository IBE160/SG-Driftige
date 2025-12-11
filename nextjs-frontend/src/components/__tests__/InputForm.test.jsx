import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from '../InputForm';

describe('InputForm', () => {
  // Mock window.alert
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    alertMock.mockClear();
  });

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

  it('should call handleSubmit with text when the form is submitted', () => {
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

  it('should render a file upload area', () => {
    render(<InputForm />);
    const fileUpload = screen.getByText(/Upload a file or drag and drop/i);
    expect(fileUpload).toBeInTheDocument();
  });

  it('should enable the button and show file name when a PDF is selected', () => {
    render(<InputForm />);
    const fileInput = screen.getByLabelText(/upload a file/i);
    const generateButton = screen.getByRole('button', { name: /generate/i });

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(generateButton).toBeEnabled();
  });

  it('should show an alert for non-PDF files', () => {
    render(<InputForm />);
    const fileInput = screen.getByLabelText(/upload a file/i);

    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(alertMock).toHaveBeenCalledWith('Please select a PDF file.');
  });
  
  it('should call handleSubmit with file when the form is submitted', () => {
    const originalLog = console.log;
    console.log = jest.fn();
    
    render(<InputForm />);
    
    const fileInput = screen.getByLabelText(/upload a file/i);
    const generateButton = screen.getByRole('button', { name: /generate/i });
    
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(generateButton);

    expect(console.log).toHaveBeenCalledWith('Submitted file:', 'test.pdf');
    
    console.log = originalLog;
  });
});
