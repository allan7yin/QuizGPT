package com.quizGpt.formManagement.Quiz.Dto;

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
public class GptRequestDto {
    //quizId
    @NotBlank
    private Long Id;

    @NotBlank
    @JsonProperty("conversationId")
    private Long ConvoId;

    @NotBlank
    @JsonProperty("quizId")
    private Long QuizId;

    @NotBlank
    @JsonProperty("number")
    private int Number;

    @NotBlank
    @JsonProperty("text")
    private String Text;

    @NotBlank
    @JsonProperty("sender")
    private String Sender;

}
