import { useQuizData } from "../Hooks/useQuizHooks";
import QuestionList from "../Components/QuestionList";
import "../Styles/QuizPage.css";
import { useState } from "react";

const QuizPage = () => {
  const { questions, answers, options, title } = useQuizData();
  console.log(title);

  return (
    <>
      <div className="quiz-container">
        <h1 type="text" className="quiz-title">
          {title}
        </h1>
        <QuestionList
          title={title}
          questions={questions}
          answers={answers}
          options={options}
        />
      </div>
    </>
  );
};

export default QuizPage;
