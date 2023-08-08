package com.quizGpt.Gateway.Quiz.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuizAttemptDto {
    @JsonProperty("quizAttemptId")
    private String quizAttemptId;

    @JsonProperty("quizId")
    private String quizId;

    @JsonProperty("userAnswerList")
    public List<UserAnswerDto> userAnswerList;
}
