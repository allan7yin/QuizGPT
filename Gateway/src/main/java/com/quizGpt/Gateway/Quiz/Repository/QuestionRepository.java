package com.quizGpt.formManagement.Quiz.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizGpt.formManagement.Quiz.Entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
}
