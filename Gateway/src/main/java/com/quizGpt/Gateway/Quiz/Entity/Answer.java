package com.quizGpt.Gateway.Quiz.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "Answer")
public class Answer {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long answerId;
    private String text;
    private Integer value;

}
