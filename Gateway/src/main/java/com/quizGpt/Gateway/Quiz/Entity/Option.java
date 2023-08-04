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
@Table(name = "Option")
public class Option {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long optionId;
    private String text;
    private Integer value;
    private int ordering;
}