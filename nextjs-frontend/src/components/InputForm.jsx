'use client';

import { useState } from 'react';

export default function InputForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setFile(null);
      // TODO: Add user-friendly error message
      alert('Please select a PDF file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // TODO: Implement API call for file upload
      console.log('Submitted file:', file.name);
    } else if (text.trim()) {
      // TODO: Implement API call for text submission
      console.log('Submitted text:', text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="text-input" className="sr-only">
          Your Text
        </label>
        <textarea
          id="text-input"
          name="text-input"
          rows="10"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#A8DADC] focus:border-[#A8DADC] transition"
          placeholder="Paste your notes or text here..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (file) setFile(null); // Clear file if text is entered
          }}
          disabled={!!file}
        ></textarea>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative px-4 bg-white text-gray-500">OR</div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex justify-center w-full h-32 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#A8DADC]"
        >
          <div className="space-y-1 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <p className="pl-1">
                {file ? file.name : 'Upload a file or drag and drop'}
              </p>
            </div>
            <p className="text-xs text-gray-500">PDF up to 10MB</p>
          </div>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" disabled={!!text.trim()} />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-[#A8DADC] text-white font-bold rounded-lg shadow-md hover:bg-[#90C2C3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8DADC] transition disabled:opacity-50"
          disabled={!text.trim() && !file}
        >
          Generate
        </button>
      </div>
    </form>
  );
}
