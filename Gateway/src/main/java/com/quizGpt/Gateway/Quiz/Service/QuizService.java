package com.quizGpt.formManagement.Quiz.Service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.quizGpt.formManagement.Quiz.Entity.Quiz;
import com.quizGpt.formManagement.Quiz.Entity.QuizAttempt;
import com.quizGpt.formManagement.Quiz.Exception.QuizAttemptNotFoundException;
import com.quizGpt.formManagement.Quiz.Exception.QuizNotFoundException;


@Service
public interface QuizService {
    // crud for quizes
    List<Quiz> GetAllQuizzes();
    Quiz GetQuizById(Long id) throws QuizNotFoundException;
    Quiz SaveQuiz(Quiz quiz);
    void DeleteQuiz(Long id) throws QuizNotFoundException;

    // crud for a particular quiz attempt 
    List<QuizAttempt> GetAllQuizAttempts();
    QuizAttempt GetQuizAttemptById(Long id) throws QuizAttemptNotFoundException;
    QuizAttempt SaveQuizAttempt(QuizAttempt attempt);
    void DeleteQuizAttempt(Long id);
}