import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Question } from "../Interfaces/QuestionInterface";
import { dataShape } from "../Interfaces/dataShapeInterface";

export const useQuizData = () => {
  const location = useLocation();
  const quizTitle = location.state.title;
  const quizId = location.state.quizId;

  console.log(location.state);

  const [questions, setQuestions] = useState<dataShape[]>([]);
  const [answers, setAnswers] = useState<dataShape[]>([]);
  const [options, setOptions] = useState<dataShape[][]>([]);
  const [title, setTitle] = useState("");

  const generateProcessingData = () => {
    const quizData = location.state.questions;
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

    // want to sort the options array
    for (let options of optionsArray) {
      options.sort((a, b) => {
        const firstCharA = a.content?.charAt(0) || "";
        const firstCharB = b.content?.charAt(0) || "";
        return firstCharA.localeCompare(firstCharB);
      });
    }
    setTitle(quizTitle);
  };
  useEffect(() => {
    generateProcessingData();
  }, []);

  return { questions, answers, options, title, quizId };
};
