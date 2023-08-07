import React, { useState } from "react";
import "../Styles/QuestionList.css";
import ErrorModal from "./ErrorModal";

const QuestionList = ({ questions, options, answers }) => {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(questions.length).fill(null)
  );
  const [results, setResults] = useState(
    new Array(questions.length).fill(null)
  );

  const handleOptionChange = (questionIndex, optionValue, isChecked) => {
    if (!submitted) {
      setSelectedOptions((prevSelectedOptions) => {
        const newSelectedOptions = [...prevSelectedOptions];
        newSelectedOptions[questionIndex] = isChecked ? optionValue : null;
        return newSelectedOptions;
      });
    }
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

      console.log(selectedOptions);
      console.log(answers);
      const newResults = [];

      for (let i = 0; i < selectedOptions.length; i++) {
        newResults.push(selectedOptions[i][0] == answers[i]);
      }
      setResults(newResults);
      console.log(results);
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
      // we have the choices the user selected in selectedOptions, send it to the backend -> name,
    } else {
      setError("Please answer all questions before saving.");
    }
  };

  const closeModal = () => {
    setError(null);
  };

  const handleRetry = (event) => {
    event.preventDefault();

    setSelectedOptions(new Array(questions.length).fill(null));
    setSubmitted(false);
  };

  return (
    <form className="question-list-container" onSubmit={handleSubmit}>
      {questions.map((question, index1) => (
        <div
          className={`question-container ${
            submitted && results[index1] ? "correct" : submitted && "wrong"
          }`}
          key={index1}
        >
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
                    checked={selectedOptions[index1] === option}
                    disabled={submitted} // Disable checkboxes when the quiz is submitted
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
      {submitted && <button onClick={handleRetry}> Retry </button>}
    </form>
  );
};

export default QuestionList;
