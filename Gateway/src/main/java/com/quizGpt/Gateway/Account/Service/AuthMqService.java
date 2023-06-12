package com.quizGpt.formManagement.Account.Service;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;

@Component
public interface AuthMqService {
    
    public <T> String SendLoginRequestDto(T loginRequestMessage) throws JsonProcessingException;

    public <T> String SendSignUpRequestDto(T SignUpRequestMessage) throws JsonProcessingException;

    public void ConsumeLoginMessageFromMQ(Object incomingMessage);

    public void ConsumeSignUpMessageFromMQ(Object incomingMessage);
}
