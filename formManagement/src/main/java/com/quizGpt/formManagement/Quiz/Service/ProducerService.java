package com.quizGpt.formManagement.Quiz.Service;

import org.springframework.stereotype.Service;

import com.quizGpt.formManagement.Quiz.Dto.CreateQuizRequestDto;

@Service
public interface ProducerService {
    void SendMessageToGptServer(CreateQuizRequestDto message);
    
}
