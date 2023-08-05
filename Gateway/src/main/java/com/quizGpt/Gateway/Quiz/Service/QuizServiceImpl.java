package com.quizGpt.Gateway.Quiz.Service;

import java.util.List;
import java.util.Optional;

import org.jvnet.hk2.annotations.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.quizGpt.Gateway.Quiz.Entity.Quiz;
import com.quizGpt.Gateway.Quiz.Entity.QuizAttempt;
import com.quizGpt.Gateway.Quiz.Exception.QuizAttemptNotFoundException;
import com.quizGpt.Gateway.Quiz.Exception.QuizNotFoundException;
import com.quizGpt.Gateway.Quiz.Repository.QuizAttemptRepository;
import com.quizGpt.Gateway.Quiz.Repository.QuizRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Component
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    // for quizzes 
    @Override
    public List<Quiz> GetAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz GetQuizById(String id) throws QuizNotFoundException {
        Optional<Quiz> response = quizRepository.findById(id);

        if (response.isPresent()) {
            return response.get(); // we use the .get(  ) method to obtain the value stored within the optional 
        } else {
            throw new QuizNotFoundException("error: quiz with id" + id + " not found");
        }
    }

    @Override
    public Quiz SaveQuiz(Quiz quiz) {
        return quizRepository.saveAndFlush(quiz);
    }

    @Override
    public void DeleteQuiz(String id) throws QuizNotFoundException {
        quizRepository.deleteById(id);
    }

    // // crud for a particular quiz attempt 
    @Override
    public List<QuizAttempt> GetAllQuizAttempts() {
        return quizAttemptRepository.findAll();
    }

    @Override
    public QuizAttempt GetQuizAttemptById(String id) throws QuizAttemptNotFoundException {
        Optional<QuizAttempt> response = quizAttemptRepository.findById(id);

        if (response.isPresent()) {
            return response.get(); // we use the .get(  ) method to obtain the value stored within the optional 
        } else {
            throw new QuizAttemptNotFoundException("error: quiz attempt with id" + id + " not found");
        }
    }

    @Override
    public QuizAttempt SaveQuizAttempt(QuizAttempt attempt) {
        return quizAttemptRepository.save(attempt);
    }

    @Override
    public void DeleteQuizAttempt(String id) {
        quizAttemptRepository.deleteById(id);
    }

    public boolean isEntryExistsByGeneratedId(String Id) {
        return quizRepository.existsById(Id);
    }
    
}
