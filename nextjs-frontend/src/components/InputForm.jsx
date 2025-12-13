'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DifficultyToggle from './DifficultyToggle';
import { submitText } from '../lib/api';

export default function InputForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (file) {
        // TODO: Implement API call for file upload
        console.log('Submitted file:', file.name, 'with difficulty:', difficulty);
        // const contentId = await submitFile(file, difficulty);
        // router.push(`/summaries/${contentId}`);
      } else if (text.trim()) {
        const contentId = await submitText(text, difficulty);
        router.push(`/summaries/${contentId}`);
      }
    } catch (err) {
      setError(err.message);
      // TODO: Display error to user in a better way
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="text-input" className="sr-only">
          Your Text
        </label>
        <textarea
          id="text-input"
          name="text-input"
          rows="6"
          className="w-full p-4 border border-gray-500 rounded-xl shadow-sm focus:ring-2 focus:ring-[#A8DADC] focus:border-[#A8DADC] transition bg-white"
          placeholder="Paste your notes or text here..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (file) setFile(null); // Clear file if text is entered
          }}
          disabled={!!file || loading}
        ></textarea>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative px-4 bg-gray-100 text-gray-400 text-sm">OR</div>
      </div>

      <div>
        <label
          htmlFor="file-upload"
          className="flex justify-center w-full h-28 px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-xl cursor-pointer hover:border-[#A8DADC] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#A8DADC] bg-white"
        >
          <div className="space-y-1 text-center">
            <svg
              className="w-10 h-10 mx-auto text-gray-400"
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
            <div className="flex text-sm text-gray-800">
              <p className="pl-1">
                {file ? file.name : 'Upload a file or drag and drop'}
              </p>
            </div>
            <p className="text-xs text-gray-600">PDF up to 10MB</p>
          </div>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" disabled={!!text.trim() || loading} />
        </label>
      </div>

      <DifficultyToggle currentDifficulty={difficulty} setDifficulty={setDifficulty} />

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          className="px-16 py-4 bg-[#A8DADC] text-black font-bold rounded-xl shadow-lg hover:bg-[#90C2C3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8DADC] transition disabled:opacity-50"
          disabled={!text.trim() && !file || loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </form>
  );
}
