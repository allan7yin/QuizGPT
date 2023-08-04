package com.quizGpt.Gateway.Account.Exception;

public class CorrelationIdNotFound extends Exception{
    public CorrelationIdNotFound(String error) {
        super(error);
    }
    
}