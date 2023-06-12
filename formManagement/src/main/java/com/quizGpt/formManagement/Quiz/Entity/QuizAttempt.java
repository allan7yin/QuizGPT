package com.quizGpt.formManagement.Quiz.Entity;

import java.util.List;

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
@Table(name = "QuizAttempt")
public class QuizAttempt {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long quizAttemptId;

    private Long quizId;

    @OneToMany(targetEntity = UserAnswer.class, cascade = CascadeType.ALL)
    @JoinColumn( name = "quizAttemptId_fk", referencedColumnName = "quizAttemptId")
    private List<UserAnswer> userAnswerList;
}
