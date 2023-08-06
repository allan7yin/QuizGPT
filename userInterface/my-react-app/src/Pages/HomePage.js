import '../Styles/HomePageDarkMode.css'
import React, { useEffect, useState } from 'react';
import { useQuizForm } from '../Hooks/useQuizForm';

import Navbar from '../Components/NavBar';
import LoginButton from '../Components/LoginButton';
import myImage from '../Images/answer.png';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { inputNumOptions, setInputNumOptions, inputNumQuestions, setInputNumQuestions, inputTopic, setInputTopic, inputDifficulty, setInputDifficulty, handleInputNumOptionsChange, handleInputNumQuestionsChange } = useQuizForm();
    const [authenticated, setAuthenticated] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Perform the authentication check here (e.g., checking the JWT in localStorage)
        const isAuthenticated = isJwtValid();
        setAuthenticated(isAuthenticated);
      }, []);

    const isJwtValid = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return false;
        try {
            const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));
            const expirationTime = decodedJwt.exp * 1000; 
            return expirationTime > Date.now();
        } catch (error) {
            return false;
        }
    };

    if (authenticated === null) {
        return null; // or return a loading indicator
      }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const loginData = {
            topic: inputTopic,
            numberOfQuestions: inputNumQuestions,
            numberOfOptionsPerQuestion: inputNumOptions,
            difficulty: inputDifficulty
        }

        // make API call to create quiz, will return a 
        try {
            const response = await fetch('http://localhost:8080/api/quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
        
            if (response.ok) {
                const quiz = await response.json()
                console.log(quiz)
                // once we have the response, we will redirect to the page /quiz/id
                const quizId = quiz.id
                console.log(quizId)
                navigate(
                    `/quiz/${quizId}`,
                    {state: quiz});
            } else {
                console.log("Something went wrong ...")
            }
        } catch (error) {
            console.error('Create Quiz Request failed:', error.message);
        }
    }

    return(
        <>
        <div className="homepage-container">
            <h1 className="homepage-title"> QuizGPT </h1>
            <img src={myImage} alt="My Image" className='home-image' />
            <div className="homepage-subtitle"> 
                Welcome to a quick and easy way to generate multiple choice quizeses!
            </div>

            <div className='description-Container'>
                <p className='description-text'> 
                This is a multiple choice quiz generation app — enter a <span className='description-text-keyword'> topic</span>, <span className='description-text-keyword'> number of questions</span>, <span className='description-text-keyword'> number of options per question</span>, and <span className='description-text-keyword'> difficulty </span> to generate a quiz
                </p>
            </div>

            <form className='Container' onSubmit={handleSubmit}>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Topic" onChange={(event) => setInputTopic(event.target.value)} value={inputTopic} /> 
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Number of Questions" onChange={handleInputNumQuestionsChange} value={inputNumQuestions}/>
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Number of Options" onChange={handleInputNumOptionsChange} value={inputNumOptions}/>
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Difficulty" onChange={(e) => setInputDifficulty(e.target.value)} value={inputDifficulty}/>
                </div>
                <div className='Prompt'> 
                    <button className='Prompt-input-submit-button'> Submit </button>
                </div>
            </form>

            {authenticated ? null : (
            <div className='login-Button-container'>
                <LoginButton />
            </div>
            )}
        </div>
        </>
    )
}

export default HomePage;