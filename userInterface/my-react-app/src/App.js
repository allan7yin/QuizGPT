import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'
import QuizPage from './Pages/QuizPage';
import Navbar from './Components/NavBar';

import React, { useState, useEffect, createContext } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr == "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App" id={theme}>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
          </Routes>
        </div>
    </ThemeContext.Provider>
  );
}

export default App
