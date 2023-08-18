import React, { FC, useEffect } from "react";
import { useQuizForm } from "../Hooks/useQuizForm";
import "../Styles/HomePageDarkMode.css";

import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import answer from "../Images/answer.png";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const {
    inputTitle,
    setInputTitle,
    inputNumOptions,
    inputNumQuestions,
    inputTopic,
    setInputTopic,
    inputDifficulty,
    setInputDifficulty,
    handleInputNumOptionsChange,
    handleInputNumQuestionsChange,
  } = useQuizForm();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const saveAccessToken = async () => {
      const domain = "dev-w5ogvkwglktdnp2m.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8080/api/v1",
            scope: "read:current_user",
          },
        });

        localStorage.setItem("token", accessToken);
      } catch (error) {
        console.error("An error occured", error);
      }
    };

    saveAccessToken();
  }, [getAccessTokenSilently]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    const quizData = {
      title: inputTitle,
      topic: inputTopic,
      numberOfQuestions: inputNumQuestions,
      numberOfOptionsPerQuestion: inputNumOptions,
      difficulty: inputDifficulty,
    };

    try {
      console.log("1");
      const response = await fetch("http://localhost:8080/api/v1/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(quizData),
      });

      console.log("2");

      if (response.ok) {
        const quiz = await response.json();
        console.log(quiz);
        const quizId = quiz.quizId;
        console.log(quizId);
        navigate(`/quiz/${quizId}`, { state: quiz });
      } else {
        console.log("Something went wrong ...");
      }
    } catch (error) {
      console.error("Create Quiz Request failed:", error);
    }
  };

  return (
    <>
      <div className="homepage-container">
        <h1 className="homepage-title"> QuizGPT </h1>
        <img src={answer} className="home-image" alt="QuizGPT" />
        <div className="homepage-subtitle">
          Welcome to a quick and easy way to generate multiple choice quizzes!
        </div>

        <div className="description-Container">
          <p className="description-text">
            This is a multiple choice quiz generation app — enter a{" "}
            <span className="description-text-keyword"> topic</span>,{" "}
            <span className="description-text-keyword">
              {" "}
              number of questions
            </span>
            ,{" "}
            <span className="description-text-keyword">
              {" "}
              number of options per question
            </span>
            , and <span className="description-text-keyword">
              {" "}
              difficulty{" "}
            </span>{" "}
            to generate a quiz
          </p>
        </div>

        <form className="Container" onSubmit={handleSubmit}>
          <div className="Prompt">
            <input
              className="Prompt-input"
              type="text"
              placeholder="Quiz Title"
              onChange={(event) => setInputTitle(event.target.value)}
              value={inputTitle}
            />
          </div>
          <div className="Prompt">
            <input
              className="Prompt-input"
              type="text"
              placeholder="Topic"
              onChange={(event) => setInputTopic(event.target.value)}
              value={inputTopic}
            />
          </div>
          <div className="Prompt">
            <input
              className="Prompt-input"
              type="text"
              placeholder="Number of Questions"
              onChange={handleInputNumQuestionsChange}
              value={inputNumQuestions}
            />
          </div>
          <div className="Prompt">
            <input
              className="Prompt-input"
              type="text"
              placeholder="Number of Options"
              onChange={handleInputNumOptionsChange}
              value={inputNumOptions}
            />
          </div>
          <div className="Prompt">
            <input
              className="Prompt-input"
              type="text"
              placeholder="Difficulty"
              onChange={(e) => setInputDifficulty(e.target.value)}
              value={inputDifficulty}
            />
          </div>
          <div className="Prompt">
            <button className="Prompt-input-submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>

        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <div className="login-Button-container">
            <LoginButton />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
