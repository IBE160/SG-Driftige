import React, { useState, useEffect } from 'react';
import './App.css';

// Placeholder for API service - will be moved to a dedicated service file later
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

async function generateSummaries(text) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.summaries;
  } catch (error) {
    console.error("Error generating summaries:", error);
    throw error;
  }
}

async function generateSummariesFromPdf(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.summaries;
  } catch (error) {
    console.error("Error generating summaries from PDF:", error);
    throw error;
  }
}

async function generateQuiz(text) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

async function generateFollowUpQuiz(text, wrongQuestions) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-follow-up-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, wrong_questions: wrongQuestions }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating follow-up quiz:", error);
    throw error;
  }
}



const FormattedSummary = ({ text }) => {
  if (!text) {
    return null;
  }

  const lines = text.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`}>{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      listItems.push(<li key={index}>{trimmedLine.substring(2)}</li>);
    } else {
      flushList();
      if (trimmedLine) {
        elements.push(<p key={index}>{trimmedLine}</p>);
      }
    }
  });

  flushList(); // Add any remaining list items

  return <>{elements}</>;
};

const QuizDisplay = ({ questions, onGenerateFollowUpQuiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    setSelectedAnswers({});
    setScore(0);
    setAnsweredQuestions({});
  }, [questions]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (answeredQuestions[questionIndex]) {
      return;
    }

    const isCorrect = questions[questionIndex].answer === optionIndex;
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
    
    setAnsweredQuestions({
      ...answeredQuestions,
      [questionIndex]: true,
    });
  };

  const getOptionClassName = (question, questionIndex, optionIndex) => {
    if (!answeredQuestions[questionIndex]) {
      return 'quiz-option';
    }
    const isCorrect = optionIndex === question.answer;
    const isSelected = selectedAnswers[questionIndex] === optionIndex;

    if (isCorrect) return 'quiz-option correct';
    if (isSelected) return 'quiz-option incorrect';
    return 'quiz-option';
  };

  const allQuestionsAnswered = Object.keys(answeredQuestions).length === questions.length;

  const handleFollowUpClick = () => {
    const wrongQuestions = questions.filter((q, index) => {
      // Only include questions that were actually answered and are incorrect
      return answeredQuestions[index] && selectedAnswers[index] !== q.answer;
    }).map(q => ({ // Map to match the backend schema (question, options, answer)
      question: q.question,
      options: q.options,
      answer: q.answer
    }));
    onGenerateFollowUpQuiz(wrongQuestions);
  };
  
  return (
    <div className="quiz-container">
      {allQuestionsAnswered && (
        <div className="quiz-score">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} / {questions.length}</p>
          {score / questions.length < 0.8 && (
            <button onClick={handleFollowUpClick} className="follow-up-quiz-button">
              Generate Follow-up Quiz
            </button>
          )}
        </div>
      )}
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="quiz-question-container">
          <p className="quiz-question">{qIndex + 1}. {q.question}</p>
          <div className="quiz-options">
            {q.options.map((option, oIndex) => (
              <button
                key={oIndex}
                className={getOptionClassName(q, qIndex, oIndex)}
                onClick={() => handleAnswerSelect(qIndex, oIndex)}
                disabled={answeredQuestions[qIndex]}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('medium'); // Default to medium for generation
  const [isLoading, setIsLoading] = useState(false);
  const [summaries, setSummaries] = useState(null);
  const [error, setError] = useState(null);
  const [activeSummaryLevel, setActiveSummaryLevel] = useState('medium'); // For display tabs
  const [quiz, setQuiz] = useState(null);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Update activeSummaryLevel when a new set of summaries is generated
  useEffect(() => {
    if (summaries) {
      setActiveSummaryLevel(level); // Set active tab to the level that was generated
    }
  }, [summaries, level]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (file) {
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (text) {
        setText('');
      }
    }
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setError(null);
    setSummaries(null); // Clear previous summaries
    setQuiz(null); // Clear previous quiz
    setShowQuiz(false);
    setActiveSummaryLevel(level); // Optimistically set active tab to requested level

    try {
      let generatedSummaries;
      if (file) {
        generatedSummaries = await generateSummariesFromPdf(file);
      } else {
        generatedSummaries = await generateSummaries(text);
      }
      setSummaries(generatedSummaries);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuizClick = async () => {
    if (!summaries) return;
    setIsQuizLoading(true);
    setQuizError(null);
    setQuiz(null);
    
    try {
      const quizData = await generateQuiz(summaries[activeSummaryLevel]);
      setQuiz(quizData.questions);
      setShowQuiz(true);
    } catch (err) {
      setQuizError(err.message || "Failed to generate quiz.");
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleGenerateFollowUpQuiz = async (wrongQuestions) => {
    if (!summaries) return;
    setIsQuizLoading(true);
    setQuizError(null);
    setQuiz(null);

    try {
      const quizData = await generateFollowUpQuiz(summaries[activeSummaryLevel], wrongQuestions);
      setQuiz(quizData.questions);
      setShowQuiz(true);
    } catch (err) {
      setQuizError(err.message || "Failed to generate follow-up quiz.");
    } finally {
      setIsQuizLoading(false);
    }
  };


  const isGenerateButtonDisabled = (!text.trim() && !file) || isLoading;

  const renderSummaryContent = () => {
    if (!summaries) return null;
    const summaryText = summaries[activeSummaryLevel] || "No summary available for this level.";

    return (
      <div className="summary-content">
        {Object.keys(summaries).length > 0 ? (
          <div className="summary-text">
            <FormattedSummary text={summaryText} />
          </div>
        ) : (
          <div className="output-placeholder">No summaries generated.</div>
        )}
      </div>
    );
  };

  const renderOutputContent = () => {
    if (showQuiz && quiz) {
      return <QuizDisplay questions={quiz} onGenerateFollowUpQuiz={handleGenerateFollowUpQuiz} />;
    }
    if (summaries) {
      return (
        <>
          <div className="summary-tabs">
            {['easy', 'medium', 'hard'].map((lvl) => (
              <button
                key={lvl}
                className={`tab-button ${activeSummaryLevel === lvl ? 'active' : ''}`}
                onClick={() => setActiveSummaryLevel(lvl)}
                disabled={isQuizLoading}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </button>
            ))}
          </div>
          {renderSummaryContent()}
          <div className="action-buttons">
            <button
              className="generate-quiz-button"
              onClick={handleGenerateQuizClick}
              disabled={isQuizLoading}
            >
              {isQuizLoading ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </div>
        </>
      );
    }
    return (
      <div className="output-placeholder">
        Your generated summary will appear here.
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        QuizZum
      </header>
      <div className="main-container">
        <div className="input-column">
          <h2>Your Notes</h2>
          <div className="input-method">
            <textarea
              className="textarea-notes"
              placeholder="Paste your lecture notes here..."
              value={text}
              onChange={handleTextChange}
              disabled={isLoading || !!file}
            />
            <div className="or-divider">OR</div>
            <div className="file-input-container">
              <input
                type="file"
                id="file-upload"
                className="file-input"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <label htmlFor="file-upload" className="file-input-label">
                {file ? file.name : 'Upload PDF'}
              </label>
            </div>
          </div>
          <div className="level-selector">
            <span>Select Summary Level: </span>
            {['easy', 'medium', 'hard'].map((lvl) => (
              <label key={lvl}>
                <input
                  type="radio"
                  value={lvl}
                  checked={level === lvl}
                  onChange={(e) => setLevel(e.target.value)}
                  disabled={isLoading}
                /> {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </label>
            ))}
          </div>
          <button
            className="generate-button"
            onClick={handleGenerateClick}
            disabled={isGenerateButtonDisabled}
          >
            {isLoading ? 'Generating...' : 'Generate Summary'}
          </button>
          {error && <p className="error-message">Error: {error}</p>}
        </div>
        <div className="output-column">
          <div className="output-header">
            <h2>{showQuiz ? 'Quiz' : 'Summary'}</h2>
            {showQuiz && (
              <button onClick={() => setShowQuiz(false)} className="switch-view-button">
                Back to Summary
              </button>
            )}
          </div>
          {quizError && <p className="error-message">Error: {quizError}</p>}
          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          ) : (
            renderOutputContent()
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
