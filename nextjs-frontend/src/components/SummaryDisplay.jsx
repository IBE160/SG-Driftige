'use client';

import React from 'react';

export default function SummaryDisplay({ summary, loading, error }) { // Removed contentId from props
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]"> {/* Adjusted min-h for component */}
        <p className="text-xl">Loading summary...</p>
        {/* A more sophisticated spinner or skeleton loader could be integrated here for better UX. */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-500"> {/* Adjusted min-h for component */}
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-h-96 overflow-y-auto"> {/* Max height and overflow-y-auto for scrollbar (AC: 3) */}
      <h2 className="text-2xl font-semibold mb-4">Summary</h2> {/* Removed contentId from h2 */}
      <p className="text-lg leading-relaxed">{summary}</p>
    </div>
  );
}
