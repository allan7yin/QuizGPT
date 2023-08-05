package com.quizGpt.Gateway.Quiz.Dto;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.GeneratedValue;
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
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

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
