import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionList from "../Components/QuestionList";
import { Question } from "../Interfaces/QuestionInterface";
import { Quiz } from "../Interfaces/QuizInterface";
import { dataShape } from "../Interfaces/dataShapeInterface";
import "../Styles/QuizPage.css";
import { LOAD_QUIZ_COMPLETE_DATA } from "../graphql/Queries";

const QuizPage = () => {
  const [quiz, setQuiz] = useState<Quiz>();
  const [questions, setQuestions] = useState<dataShape[]>([]);
  const [answers, setAnswers] = useState<dataShape[]>([]);
  const [options, setOptions] = useState<dataShape[][]>([]);
  const [title, setTitle] = useState("");

  const accessToken = localStorage.getItem("token");
  const location = useLocation();
  const quizId = location.state;

  const { loading, data } = useQuery(LOAD_QUIZ_COMPLETE_DATA, {
    variables: {
      quizId,
    },
    context: {
      headers: {
        Authorization: accessToken,
      },
    },
  });

  const generateProcessingData = () => {
    if (quiz != null) {
      const quizTitle = quiz.title;
      const quizData = quiz.questions;
      console.log(quizData);
      const questionsArray: dataShape[] = [];
      const answersArray: dataShape[] = [];
      const optionsArray: dataShape[][] = [];

      quizData.forEach((question: Question) => {
        const newQuestion: dataShape = {
          type: "question",
          id: question.questionId,
          content: question.content,
        };
        questionsArray.push(newQuestion);

        const ansText = question.answers[0].content;
        const ans = ansText[ansText.length - 1];

        const newAnswer: dataShape = {
          type: "answer",
          id: question.answers[0].answerId,
          content: ans,
        };
        answersArray.push(newAnswer);

        const optionsText = question.options;
        const tempArray: dataShape[] = [];
        optionsText.forEach((option) => {
          let newOption: dataShape = {
            type: "option",
            id: option.optionId,
            content: option.content,
          };
          tempArray.push(newOption);
        });
        optionsArray.push(tempArray);
      });

      setQuestions(questionsArray);
      setAnswers(answersArray);
      setOptions(optionsArray);
      setTitle(quizTitle);
    }
  };

  useEffect(() => {
    if (data) {
      setQuiz(data.quiz);
      console.log(quiz);
      generateProcessingData();
    }
  }, [data, quiz]);

  return (
    <>
      {!loading ? (
        <>
          <div className="quiz-container">
            <h1 className="quiz-title">{title}</h1>
            <QuestionList
              title={title}
              questions={questions}
              answers={answers}
              options={options}
              quizId={quizId}
            />
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default QuizPage;
