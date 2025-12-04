import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To indicate if initial loading from localStorage is complete

  useEffect(() => {
    // Attempt to load user from local storage on initial render
    const storedToken = localStorage.getItem('access_token');
    const storedEmail = localStorage.getItem('user_email'); // Assuming we store email alongside token
    if (storedToken && storedEmail) {
      setUser({ email: storedEmail, token: storedToken });
    }
    setLoading(false);
  }, []);

  const login = (email, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_email', email);
    setUser({ email, token });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
