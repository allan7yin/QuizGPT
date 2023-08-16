// quizHooks.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQuizData = () => {
  const location = useLocation();
  const quizTitle = location.state.title;
  const quizId = location.state.quizId;

  console.log(location.state);

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

    // save the question + answer + option id, will need when saving the attempt
    quizData.forEach((question) => {
      questionsArray.push([question.questionId, question.text]);

      const ansText = question.answers[0].content;
      const ans = ansText[ansText.length - 1];
      answersArray.push([question.answers[0].answerId, ans]);

      const optionsText = question.options;
      const tempArray = [];
      optionsText.forEach((option) => {
        tempArray.push([option.optionId, option.content]);
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

  return { questions, answers, options, title, quizId };
};
