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
            body: JSON.stringify({ text_content: text }), // Changed payload to match backend schema
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

export async function getQuiz(contentId, difficulty) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${backendUrl}/api/v1/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content_id: contentId, difficulty }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch quiz');
        }

        const data = await response.json();
        return data.data; // Assumes the backend returns { "data": { "quiz_id": "...", "questions": [...] } }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        throw error;
    }
}

export async function submitQuiz(quizId, submission) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${backendUrl}/api/v1/quiz/${quizId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to submit quiz');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        throw error;
    }
}

export async function getAdaptiveQuiz(originalQuizId, contentId, previousResult) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${backendUrl}/api/v1/quiz/${originalQuizId}/follow-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content_id: contentId,
                previous_result: previousResult,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch adaptive quiz');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching adaptive quiz:', error);
        throw error;
    }
}

export async function submitFile(file) { // Difficulty is not used by the backend /upload/pdf endpoint
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${backendUrl}/api/v1/upload/pdf`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to submit file');
        }

        const data = await response.json();
        return data.data.content_id; // Assumes the backend returns a content_id
    } catch (error) {
        console.error('Error submitting file:', error);
        throw error;
    }
}
