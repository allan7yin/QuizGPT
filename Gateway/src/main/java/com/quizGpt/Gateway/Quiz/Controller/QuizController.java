package com.quizGpt.Gateway.Quiz.Controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizGpt.Gateway.Account.Controller.AccountController;
import com.quizGpt.Gateway.Quiz.Dto.CreateQuizRequestDto;
import com.quizGpt.Gateway.Quiz.Dto.QuizDto;
import com.quizGpt.Gateway.Quiz.Entity.Quiz;
import com.quizGpt.Gateway.Quiz.Exception.QuizNotFoundException;
import com.quizGpt.Gateway.Quiz.Service.QuizServiceImpl;
import com.quizGpt.Gateway.Quiz.Service.RabbitMqServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private RabbitMqServiceImpl rabbitMqService;

    @Autowired
    private ModelMapper modelMapper;

    // @Autowired
    private QuizServiceImpl quizService;    

    private final Logger logger = LoggerFactory.getLogger(QuizController.class);

    @PostMapping("/createQuiz")
    public void CreateQuiz(@RequestBody CreateQuizRequestDto createQuizRequestDto) {
        rabbitMqService.SendMessageToGptServer(createQuizRequestDto);
    }

    @PostMapping("/createQuizTest")
    public String CreateQuizTest(@RequestBody CreateQuizRequestDto createQuizRequestDto) {
        logger.info(createQuizRequestDto.toString());
        return createQuizRequestDto.getId();
    }

    @GetMapping("/quizzes")
    public List<QuizDto> GetAllQuizzes() {
        List<QuizDto> quizDtos = new ArrayList<>();
        List<Quiz> quizzes = this.quizService.GetAllQuizzes();

        for (Quiz quiz : quizzes) {
            QuizDto quizDto = modelMapper.map(quiz, QuizDto.class);
            quizDtos.add(quizDto);
        }

        return quizDtos;
    }

    @GetMapping("/quiz/{id}")
    public QuizDto GetQuiz(@PathVariable Long id) throws QuizNotFoundException {
        Quiz quiz =  quizService.GetQuizById(id);
        var quizDto = modelMapper.map(quiz, QuizDto.class);
        return quizDto;
    }

    @DeleteMapping("/quiz/{id}")
    public void DeleteQuiz(@PathVariable Long id) throws QuizNotFoundException {
        quizService.DeleteQuiz(id);
    }
    
}
