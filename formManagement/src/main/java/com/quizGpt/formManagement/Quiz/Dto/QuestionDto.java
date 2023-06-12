package com.quizGpt.formManagement.Quiz.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuestionDto {
    // private Long questionId;
    private String text;

    private List<OptionDto> options;
    private List<AnswerDto> answers;
}
