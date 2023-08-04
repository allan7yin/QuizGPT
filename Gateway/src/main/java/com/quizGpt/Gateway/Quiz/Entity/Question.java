
package com.quizGpt.Gateway.Quiz.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "Question")
public class Question {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long questionId;
    
    private String text;

    @OneToMany(targetEntity = Option.class, cascade = CascadeType.ALL)
    @JoinColumn( name="questionId_fk", referencedColumnName = "questionId")
    private List<Option> options;

    @OneToMany(targetEntity = Answer.class, cascade = CascadeType.ALL)
    @JoinColumn( name="questionId_fk", referencedColumnName = "questionId")
    private List<Answer> answers;
}
