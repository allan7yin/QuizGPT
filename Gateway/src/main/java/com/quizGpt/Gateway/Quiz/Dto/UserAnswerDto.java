package com.quizGpt.Gateway.Quiz.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserAnswerDto {
    public String userAnswerId; // uuid
    public int questionId;
    public String text;
}