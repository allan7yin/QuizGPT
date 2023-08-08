import React, { useState } from "react";
import "../Styles/QuestionList.css";
import ErrorModal from "./ErrorModal";

const QuestionList = ({ title, questions, options, answers, quizId }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== undefined
    );

    if (allQuestionsAnswered) {
      setError("");
      setSubmitted(true);
      console.log("Quiz submitted successfully.");
      const newResults = [];

      for (let i = 0; i < selectedOptions.length; i++) {
        newResults.push(selectedOptions[i][0] == answers[i][1]);
      }
      setResults(newResults);
    } else {
      setError("Please answer all questions before submitting.");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const allQuestionsAnswered = questions.every(
      (question, index) => selectedOptions[index] !== null
    );

    if (allQuestionsAnswered) {
      // Save the quiz
      setError("");
      console.log("Quiz saved successfully.");
      // we have the choices the user selected in selectedOptions, send it to the backend -> name,

      const userAnswers = [];

      for (let i = 0; i < questions.length; i++) {
        userAnswers.push({
          questionId: questions[0][0],
          text: selectedOptions[i],
        });
      }

      const attemptData = {
        quizId: quizId,
        userAnswerList: userAnswers,
      };

      try {
        const response = await fetch("http://localhost:8080/api/quizAttempt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attemptData),
        });

        if (response.ok) {
          // console.log(response.data);
        } else {
          console.log("Something went wrong while saving attempt...");
        }
      } catch (error) {
        console.error(error.errorMessage);
      }
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
          <div className="question">{question[1]}</div>
          <div class="options-container">
            {options[index1].map((option, index2) => (
              <div key={index2}>
                <label>
                  <input
                    type="checkbox"
                    className="option"
                    value={option[1]}
                    onChange={(event) =>
                      handleOptionChange(
                        index1,
                        option[1],
                        event.target.checked
                      )
                    }
                    checked={selectedOptions[index1] === option[1]}
                    disabled={submitted} // Disable checkboxes when the quiz is submitted
                  />
                  {option[1]}
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
