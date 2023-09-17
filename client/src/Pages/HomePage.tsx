import { FC } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import LoginButton from "../Components/LoginButton";
import "../Styles/HomePage.css";

const HomePage: FC = () => {
  const [text] = useTypewriter({
    words: ["Dynamic", "Custom", "Personalized", "Quick"],
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  return (
    <>
      <div className="homepage-container">
        <div className="homepage-title">
          <span>{text} </span>
          <span>
            <Cursor cursorColor="red" />
          </span>
          <span>online quiz maker</span>
        </div>
        <div className="homepage-subtitle">
          Quizzes are a powerful tool for engagement and learning. Take yours to
          the next level with QuizGPT, and create a quiz of any topic.
        </div>

        <div className="tryoutContainer">
          <LoginButton message="Get started - it's free" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
