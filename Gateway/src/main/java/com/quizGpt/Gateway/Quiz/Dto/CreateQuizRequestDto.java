package com.quizGpt.Gateway.Quiz.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateQuizRequestDto {
    @NotBlank
    @JsonProperty("id")
    private Long id;

    @NotBlank
    @JsonProperty("topic")
    private String topic;

    @NotBlank
    @JsonProperty("numberOfQuestions")
    private Long numberOfQuestions;

    @NotBlank
    @JsonProperty("numberOfOptionsPerQuestion")
    private Long numberOfOptionsPerQuestion;

    @NotBlank
    @JsonProperty("difficulty")
    private String difficulty;
    
}
