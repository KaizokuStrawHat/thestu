import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  console.log('in ServerStatusContext.jsx')
  const [isServerRunning, setIsServerRunning] = useState(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
        await axios.get('http://localhost:5000/checkServerStatus')
        .then(() => {
            setIsServerRunning(true);
        })
        .catch(() => setIsServerRunning(false));
    };
    fetchServerStatus();
  }, []);

  return (
    <ServerStatusContext.Provider value={isServerRunning}>
      {children}
    </ServerStatusContext.Provider>
  );
};