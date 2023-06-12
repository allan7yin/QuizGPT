package com.quizGpt.formManagement.Quiz.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizGpt.formManagement.Quiz.Entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>{
}
