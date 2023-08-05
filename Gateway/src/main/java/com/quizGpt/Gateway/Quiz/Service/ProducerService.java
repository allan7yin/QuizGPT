package com.quizGpt.Gateway.Quiz.Service;

import org.springframework.stereotype.Service;

import com.quizGpt.Gateway.Quiz.Dto.CreateQuizRequestDto;

@Service
public interface ProducerService {
    void SendMessageToGptServer(CreateQuizRequestDto message);
}
