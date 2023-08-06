import React from 'react';
import {useLocation} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/NavBar';


const QuizPage = () => {
  const { quizId } = useParams();
  const location = useLocation();

  // Fetch quiz data using the quiz ID from the URL
  const testReceive = () => {
    console.log(location.state)
  }

  return (
    <>
    <Navbar />
    <button onClick={testReceive}> TEST </button>
    </>
  );
};

export default QuizPage;
