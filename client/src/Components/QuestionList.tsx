import { Checkbox, FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import { dataShape } from "../Interfaces/dataShapeInterface";
import "../Styles/QuestionList.css";

interface QuestionListProps {
  title: string;
  questions: dataShape[];
  options: dataShape[][];
  answers: dataShape[];
  quizId: string;
}

const QuestionList: FC<QuestionListProps> = ({
  title,
  questions,
  options,
  answers,
  quizId,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [results, setResults] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const handleOptionChange = (
    questionIndex: number,
    optionValue: string,
    isChecked: boolean
  ) => {
    if (!submitted) {
      setSelectedOptions((prevSelectedOptions) => {
        const newSelectedOptions = [...prevSelectedOptions];
        newSelectedOptions[questionIndex] = isChecked ? optionValue : "";
        return newSelectedOptions;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== ""
    );

    if (allQuestionsAnswered) {
      setError(null);
      setSubmitted(true);
      console.log("Quiz submitted successfully.");
      const newResults: boolean[] = [];

      for (let i = 0; i < selectedOptions.length; i++) {
        newResults.push(selectedOptions[i][0] === answers[i].content);
      }
      setResults(newResults);
    } else {
      setError("Please answer all questions before submitting.");
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== ""
    );

    if (allQuestionsAnswered) {
      setError("");
      console.log("Quiz saved successfully.");

      const userAnswers = questions.map((question, i) => ({
        questionId: question.id,
        text: selectedOptions[i],
      }));

      const attemptData = {
        quizId: quizId,
        userAnswerList: userAnswers,
      };

      try {
        console.log(JSON.stringify(attemptData));
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/v1/quiz/:${quizId}/save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(attemptData),
          }
        );

        if (response.ok) {
          console.log("saved attempt!");
        } else {
          console.log("Something went wrong while saving attempt...");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Please answer all questions before saving.");
    }
  };

  const handleRetry = (event: React.MouseEvent) => {
    event.preventDefault();

    setSelectedOptions(new Array(questions.length).fill(""));
    setSubmitted(false);
  };

  return (
    <form className="question-list-container" onSubmit={handleSubmit}>
      {questions.map((question, index1) => (
        <div
          className={`question-container ${
            submitted && results[index1] ? "correct" : submitted ? "wrong" : ""
          }`}
          key={index1}
        >
          <div className="question">{question.content}</div>
          <div className="options-container">
            {options[index1].map((option, index2) => (
              <div key={index2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="option"
                      checked={selectedOptions[index1] === option.content}
                      disabled={submitted}
                      onChange={(event) =>
                        handleOptionChange(
                          index1,
                          option.content!,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label={option.content}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="button-container">
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {submitted && <button onClick={handleSave}>Save</button>}
        {submitted && <button onClick={handleRetry}>Retry</button>}
      </div>
    </form>
  );
};

export default QuestionList;
