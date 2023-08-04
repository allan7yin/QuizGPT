import React from 'react';
import '../Styles/HomePage.css'
import { useState } from 'react';

import Navbar from '../Components/NavBar';

const HomePage = () => {
    const [inputNumOptions, setInputNumOptions] = useState('');
    const [inputNumQuestions, setInputNumQuestions] = useState('');

    const handleInputNumOptionsChange = (event) => {
        const { value } = event.target;
        setInputNumOptions(value.replace(/\D/g, '')); // Remove all non-digit characters
        };
    
    const handleInputNumQuestionsChange = (event) => {
        const { value } = event.target;
        setInputNumQuestions(value.replace(/\D/g, '')); // Remove all non-digit characters
        };

    return(
        <>
        <Navbar />
        <div className="homepage-container">
            <div className="homepage-title"> QuizGPT </div>
            <div className="homepage-subtitle"> 
                Welcome to a quick and easy way to generate multiple choice quizeses!
            </div>

            <div className='Container'>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Topic"/>
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Number of Questions" onChange={handleInputNumQuestionsChange} value={inputNumQuestions}/>
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Number of Options" onChange={handleInputNumOptionsChange} value={inputNumOptions}/>
                </div>
                <div className='Prompt'>
                    <input className='Prompt-input' type="text" placeholder="Difficulty"/>
                </div>

            </div>
        </div>
        </>
    )
}

export default HomePage;