import Modal from "react-modal";
import "./App.css";
import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import QuizPage from "./Pages/QuizPage";

import { createContext } from "react";
import { Route, Routes } from "react-router-dom";

export const ThemeContext = createContext(null);

function App() {
  Modal.setAppElement("#root");

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
