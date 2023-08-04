package com.quizGpt.Gateway.Quiz.Exception;

public class QuizAttemptNotFoundException  extends Exception {
    public QuizAttemptNotFoundException(String errorMessage ) {
        super(errorMessage);
    }
}