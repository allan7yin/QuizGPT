package com.quizGpt.Gateway.Quiz.Entity;

import java.util.List;

import org.hibernate.annotations.GenericGenerator;

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
    private String quizAttemptId;

    private String quizId;

    @OneToMany(targetEntity = UserAnswer.class, cascade = CascadeType.ALL)
    @JoinColumn( name = "quizAttemptId_fk", referencedColumnName = "quizAttemptId")
    private List<UserAnswer> userAnswerList;
}
