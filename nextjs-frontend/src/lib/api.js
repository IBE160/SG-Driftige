export async function fetchSummary(contentId, difficulty) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${backendUrl}/api/v1/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content_id: contentId, difficulty }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch summary');
        }

        const data = await response.json();
        return data.data.summary_text; // Access summary_text within the 'data' field
    } catch (error) {
        console.error('Error fetching summary:', error);
        throw error;
    }
}

export async function submitText(text, difficulty) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${backendUrl}/api/v1/upload/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, difficulty }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to submit text');
        }

        const data = await response.json();
        return data.data.content_id; // Assumes the backend returns a content_id
    } catch (error) {
        console.error('Error submitting text:', error);
        throw error;
    }
}
