import { FC } from "react";
import "../Styles/HomePage.css";

import LoginButton from "../Components/LoginButton";

const HomePage: FC = () => {
  return (
    <>
      <div className="homepage-container">
        <div className="homepage-title">
          {" "}
          Quick online quiz maker: custom quizzes in seconds{" "}
        </div>
        <div className="homepage-subtitle">
          Quizzes are a powerful tool for engagement, and wildly underrated for
          bringing in more customers. Take yours to the next level with
          Typeform.
        </div>

        <div className="tryoutContainer">
          <LoginButton message="Get started - it's free" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
