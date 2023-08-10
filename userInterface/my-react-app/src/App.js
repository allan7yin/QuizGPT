import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import QuizPage from "./Pages/QuizPage";
import Navbar from "./Components/NavBar";
import Modal from "react-modal";

import React, { useState, useEffect, createContext } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const domain = "dev-00dsimc0pm4uj0sb.us.auth0.com";
const clientId = "5hmF9hdFJHcgXfoTrE8TypH5YsITw2ot";

export const ThemeContext = createContext(null);

function App() {
  // const handleCallBackRespsone = (response) => {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // };

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     clientId:
  //       "942515831813-91fk4re76j93njvkhq649orqlv2sl7p7.apps.googleusercontent.com",
  //     callback: handleCallBackRespsone,
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("google-signin-button"),
  //     { theme: "outline", size: "large" }
  //   );
  // }, []);

  const [theme, setTheme] = useState("light");
  console.log(domain);
  console.log(clientId);

  const toggleTheme = () => {
    setTheme((curr) => (curr == "light" ? "dark" : "light"));
  };

  Modal.setAppElement("#root");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
