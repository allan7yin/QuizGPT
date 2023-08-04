import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'

import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
