package com.quizGpt.Gateway.Quiz.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizGpt.Gateway.Quiz.Entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>{
}
