import { useEffect, useState } from "react";
import { Question } from "../Interfaces/QuestionInterface";
import { Quiz } from "../Interfaces/QuizInterface";
import { dataShape } from "../Interfaces/dataShapeInterface";

export const useQuizData = (quiz: Quiz) => {
  const quizTitle = quiz.title;

  const [questions, setQuestions] = useState<dataShape[]>([]);
  const [answers, setAnswers] = useState<dataShape[]>([]);
  const [options, setOptions] = useState<dataShape[][]>([]);
  const [title, setTitle] = useState("");

  const generateProcessingData = () => {
    const quizData = quiz.questions;
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
  };
  useEffect(() => {
    generateProcessingData();
  }, []);

  return { questions, answers, options, title };
};
