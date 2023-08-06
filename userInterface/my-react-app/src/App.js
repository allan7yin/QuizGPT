import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'
import QuizPage from './Pages/QuizPage';

import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
