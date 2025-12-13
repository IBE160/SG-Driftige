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
