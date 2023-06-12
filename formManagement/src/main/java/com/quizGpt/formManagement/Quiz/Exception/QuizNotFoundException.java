package com.quizGpt.formManagement.Quiz.Exception;

public class QuizNotFoundException  extends Exception {
    public QuizNotFoundException(String errorMessage ) {
        super(errorMessage);
    }
}