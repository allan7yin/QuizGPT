import React from 'react';
import '../Styles/QuestionList.css'

const QuestionList = ({ questions, options, answers }) => {
    console.log(questions)
    console.log(options)
    console.log(answers)
    
  return (
    <div className='question-list-container'>
      {questions.map((question, index1) => (
        <form className='question-container' key={index1}>
            <div className='question'>{question}</div>
            <div class="options-container">
                {options[index1].map((option, index2) => (
                    <div key={index2}>
                        <label>
                            <input type='checkbox' className='option' value={option} />
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </form>
      ))}
      <button> submit </button>
      <button> save </button>
    </div>
    
  );
};

export default QuestionList;
