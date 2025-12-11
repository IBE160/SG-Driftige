'use client';

import { useState } from 'react';

export default function InputForm() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend
    console.log('Submitted text:', text);
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
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-[#A8DADC] text-white font-bold rounded-lg shadow-md hover:bg-[#90C2C3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8DADC] transition"
          disabled={!text.trim()}
        >
          Generate
        </button>
      </div>
    </form>
  );
}
