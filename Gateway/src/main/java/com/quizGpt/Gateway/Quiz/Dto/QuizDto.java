package com.quizGpt.Gateway.Quiz.Dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

// AKA gptResponseDto
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuizDto {
    @NotBlank
    @JsonProperty("id")
    private String id;

    @JsonProperty("title")
    private String title;

    @NotBlank
    @JsonProperty("questions")
    private List<QuestionDto> Questions;
}


