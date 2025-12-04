import React, { useState } from 'react';

const AuthForm = ({ onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

  const handleAuth = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const endpoint = isRegister 
      ? `${API_BASE_URL}/api/register` 
      : `${API_BASE_URL}/api/login`;
    const method = 'POST';
    
    let bodyContent;
    let contentType;

    if (isRegister) {
        bodyContent = JSON.stringify({ email, password });
        contentType = 'application/json';
    } else {
        // For login, FastAPI expects 'application/x-www-form-urlencoded'
        // with username and password as form data.
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        bodyContent = formData.toString();
        contentType = 'application/x-www-form-urlencoded';
    }


    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
            'Content-Type': contentType,
        },
        body: bodyContent,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Authentication failed.");
        return;
      }

      // Handle successful authentication
      if (isRegister) {
        alert("Registration successful! Please log in.");
        setIsRegister(false); // Switch to login form
      } else {
        // Assume login returns an access_token
        onAuthSuccess(email, data.access_token); // <-- Pass email here
      }

    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading} className="auth-button">
          {isLoading ? (isRegister ? 'Registering...' : 'Logging In...') : (isRegister ? 'Register' : 'Login')}
        </button>
      </form>
      <p className="switch-auth-mode">
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
        <button onClick={() => setIsRegister(!isRegister)} disabled={isLoading} className="switch-button">
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
