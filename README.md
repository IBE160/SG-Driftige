# QuizZum

## AI-Powered Summarization and Quizzing Application

QuizZum is an innovative web application designed to enhance learning and content comprehension through AI-driven summarization and interactive quizzing. Users can upload text or PDF content, receive multi-level summaries, and generate quizzes tailored to their understanding. The application features adaptive quizzing to help users practice their weak spots effectively.

## Features

-   **Content Upload:** Upload text directly or PDF documents.
-   **AI Summarization:** Generate summaries of uploaded content at various difficulty levels.
-   **Quiz Generation:** Create quizzes based on summarized content.
-   **Interactive Quizzing:** Take quizzes and receive instant feedback on performance.
-   **Adaptive Learning:** Practice weak spots with follow-up quizzes tailored to incorrect answers.

## Technologies Used

### Frontend
-   **Framework:** Next.js (React)
-   **Styling:** Tailwind CSS (based on `tailwind.config.js`)
-   **Package Manager:** npm / yarn

### Backend
-   **Framework:** FastAPI (Python)
-   **Database:** Prisma (with PostgreSQL, inferred from `prisma/schema.prisma`)
-   **Caching:** Redis (inferred from `quiz_service.py` and `docker-compose.yml`)
-   **LLM Integration:** Gemini API (inferred from `LLM_API_ENDPOINT` in sprint proposal)

### Deployment & Development
-   **Containerization:** Docker, Docker Compose

## Setup and Installation

To set up QuizZum locally, follow these steps:

### Prerequisites

-   Docker and Docker Compose installed on your system.
-   An API key for the Gemini API.

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/QuizZum.git # Replace with actual repo URL
cd QuizZum
```

### 2. Configure Environment Variables

Create a `.env` file in the `fastapi-backend/` directory and add your LLM API key and endpoint:

```
LLM_API_KEY="YOUR_GEMINI_API_KEY"
LLM_API_ENDPOINT="https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent"
```

### 3. Build and Run with Docker Compose

Navigate to the root directory of the project where `docker-compose.yml` is located and run:

```bash
docker-compose up --build
```

This command will:
-   Build the Docker images for both the frontend and backend.
-   Start the PostgreSQL, Redis, FastAPI backend, and Next.js frontend services.

### 4. Access the Application

-   **Frontend:** Open your browser and navigate to `http://localhost:3000`
-   **Backend API Documentation (Swagger UI):** `http://localhost:8000/docs`

## Usage

1.  **Upload Content:** On the homepage, you can either paste text directly or upload a PDF file.
2.  **Summarize:** Once content is submitted, you will be directed to a summary page where you can view summaries at different difficulty levels (Easy, Medium, Hard).
3.  **Generate Quiz:** From the summary page, click the "Generate Quiz" button to create an interactive quiz based on the summary.
4.  **Take Quiz:** Answer the questions, navigate between them, and submit your answers.
5.  **View Results:** After submitting, you'll see your score and a breakdown of correct/incorrect answers.
6.  **Practice Weak Spots:** Click "Practice Weak Spots" to generate a new quiz focusing on the topics you answered incorrectly in the previous quiz.

## Testing

The project includes E2E tests using Playwright. To run them:

1.  Ensure the Docker containers are running (`docker-compose up`).
2.  Navigate to the `nextjs-frontend/` directory: `cd nextjs-frontend/`
3.  Run Playwright tests: `npx playwright test`

## Contributing

Please adhere to the project's coding standards and conventions.

## License

[Specify your project's license here]

## Contact

For any inquiries, please contact [Your Name/Email/GitHub Profile].