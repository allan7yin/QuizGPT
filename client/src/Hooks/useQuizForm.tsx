import { ChangeEvent, useState } from "react";

export const useQuizForm = () => {
  const [inputNumOptions, setInputNumOptions] = useState("");
  const [inputNumQuestions, setInputNumQuestions] = useState("");
  const [inputTopic, setInputTopic] = useState("");
  const [inputDifficulty, setInputDifficulty] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const handleInputNumOptionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputNumOptions(value.replace(/\D/g, "")); // Remove all non-digit characters
  };

  const handleInputNumQuestionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputNumQuestions(value.replace(/\D/g, "")); // Remove all non-digit characters
  };

  return {
    inputTitle,
    setInputTitle,
    inputNumOptions,
    setInputNumOptions,
    inputNumQuestions,
    setInputNumQuestions,
    inputTopic,
    setInputTopic,
    inputDifficulty,
    setInputDifficulty,
    handleInputNumOptionsChange,
    handleInputNumQuestionsChange,
  };
};
