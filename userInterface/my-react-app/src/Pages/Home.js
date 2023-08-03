import React from 'react';
import '../Styles/HomePage.css'

import Navbar from '../Components/NavBar';

const HomePage = () => {
    return(
        <>
        <Navbar />
        <div className="homepage-container">
            <div className="homepage-title"> 
                Welcome to QuizGPT: Generate Multiple Choice Quizes
            </div>
        </div>
        </>
    )
}

export default HomePage;