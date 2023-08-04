package com.quizGpt.Gateway.Quiz.Service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.quizGpt.Gateway.Quiz.Dto.QuizDto;

@Service
public interface ConsumerService {
    public void ConsumeMessageFromGptServer(QuizDto message) throws JsonProcessingException;
}
