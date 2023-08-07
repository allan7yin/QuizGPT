import React, { useState } from "react";
import "../Styles/QuestionList.css";
import ErrorModal from "./ErrorModal";

const QuestionList = ({ questions, options, answers }) => {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionIndex, optionValue, isChecked) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: isChecked ? optionValue : null,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== undefined
    );

    if (allQuestionsAnswered) {
      setError("");
      setSubmitted(true);
      console.log("Quiz submitted successfully.");
    } else {
      setError("Please answer all questions before submitting.");
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== null
    );

    if (allQuestionsAnswered) {
      // Save the quiz
      setError("");
      console.log("Quiz saved successfully.");
    } else {
      setError("Please answer all questions before saving.");
    }
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <form className="question-list-container" onSubmit={handleSubmit}>
      {questions.map((question, index1) => (
        <div className="question-container" key={index1}>
          <div className="question">{question}</div>
          <div class="options-container">
            {options[index1].map((option, index2) => (
              <div key={index2}>
                <label>
                  <input
                    type="checkbox"
                    className="option"
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index1, option, event.target.checked)
                    }
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {submitted && <button onClick={handleSave}>Save</button>}
      {error && <ErrorModal errorMessage={error} onClose={closeModal} />}
    </form>
  );
};

export default QuestionList;
