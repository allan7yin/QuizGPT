package com.quizGpt.Gateway.Quiz.Service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.quizGpt.Gateway.Quiz.Entity.Quiz;
import com.quizGpt.Gateway.Quiz.Entity.QuizAttempt;
import com.quizGpt.Gateway.Quiz.Exception.QuizAttemptNotFoundException;
import com.quizGpt.Gateway.Quiz.Exception.QuizNotFoundException;


@Service
public interface QuizService {
    // crud for quizes
    List<Quiz> GetAllQuizzes();
    Quiz GetQuizById(String id) throws QuizNotFoundException;
    Quiz SaveQuiz(Quiz quiz);
    void DeleteQuiz(String id) throws QuizNotFoundException;

    // crud for a particular quiz attempt 
    List<QuizAttempt> GetAllQuizAttempts();
    QuizAttempt GetQuizAttemptById(String id) throws QuizAttemptNotFoundException;
    QuizAttempt SaveQuizAttempt(QuizAttempt attempt);
    void DeleteQuizAttempt(String id);
}