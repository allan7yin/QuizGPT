import React, { useEffect, useState } from 'react';
import Navbar from '../Components/NavBar';
import { useQuizData } from '../Hooks/useQuizHooks';
import QuestionList from '../Components/QuestionList';
import '../Styles/QuizPage.css'

const QuizPage = () => {
    const { questions, answers, options } = useQuizData();
    // console.log(questions)
    // console.log(answers)
    // console.log(options)

    return (
        <>
        <div className='quiz-container'>
            <h1 className='quiz-title'> Generated Quiz </h1>
            <QuestionList questions={questions} answers={answers} options={options} />
        </div>

        </>
    );
};

export default QuizPage;
