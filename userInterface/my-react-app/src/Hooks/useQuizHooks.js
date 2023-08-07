// quizHooks.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQuizData = () => {
  const location = useLocation();
  const quizData = location.state.questions;
  const quizTitle = location.state.title;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");

  const generateProcessingData = () => {
    const quizData = location.state.questions;
    const questionsArray = [];
    const answersArray = [];
    const optionsArray = [];
    // extract question, options, and answers into one separate arrays
    // wil make answer checking much easier

    quizData.forEach((question) => {
      const questionText = question.text;
      questionsArray.push(questionText);

      const ansText = question.answers[0].text;
      const ans = ansText[ansText.length - 1];
      answersArray.push(ans);

      const optionsText = question.options;
      const tempArray = [];
      optionsText.forEach((option) => {
        tempArray.push(option.text);
      });
      optionsArray.push(tempArray);
    });

    setQuestions(questionsArray);
    setAnswers(answersArray);
    setOptions(optionsArray);
    setTitle(quizTitle);
  };
  useEffect(() => {
    generateProcessingData();
  }, []);

  return { questions, answers, options, title };
};
