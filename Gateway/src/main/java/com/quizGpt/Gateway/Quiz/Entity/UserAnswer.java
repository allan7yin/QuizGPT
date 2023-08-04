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
@Table(name = "UserAnswer")
public class UserAnswer {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public Long userAnswerId;

    public int questionId;
    public String text;
}
