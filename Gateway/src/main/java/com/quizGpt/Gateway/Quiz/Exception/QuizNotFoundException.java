package com.quizGpt.Gateway.Quiz.Exception;

public class QuizNotFoundException  extends Exception {
    public QuizNotFoundException(String errorMessage ) {
        super(errorMessage);
    }
}