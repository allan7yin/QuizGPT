import './App.css';
import Home from './Pages/Home';

import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
