package com.quizGpt.Gateway.Quiz.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicLong;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizGpt.Gateway.Quiz.Dto.CreateQuizRequestDto;
import com.quizGpt.Gateway.Quiz.Dto.QuizAttemptDto;
import com.quizGpt.Gateway.Quiz.Dto.QuizDto;
import com.quizGpt.Gateway.Quiz.Entity.Quiz;
import com.quizGpt.Gateway.Quiz.Entity.QuizAttempt;
import com.quizGpt.Gateway.Quiz.Exception.QuizAttemptNotFoundException;
import com.quizGpt.Gateway.Quiz.Exception.QuizNotFoundException;
import com.quizGpt.Gateway.Quiz.Service.QuizServiceImpl;
import com.quizGpt.Gateway.Quiz.Service.RabbitMqServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private RabbitMqServiceImpl rabbitMqService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private QuizServiceImpl quizService;    

    private final Logger logger = LoggerFactory.getLogger(QuizController.class);
    private static final AtomicLong counter = new AtomicLong(1);

    @PostMapping("/quiz")
    public String CreateQuiz(@RequestBody CreateQuizRequestDto createQuizRequestDto) throws JsonProcessingException, QuizNotFoundException, TimeoutException, InterruptedException, ExecutionException {
        String generatedId = UUID.randomUUID().toString();
        createQuizRequestDto.setId(generatedId);
        logger.info(createQuizRequestDto.toString());
        rabbitMqService.SendMessageToGptServer(createQuizRequestDto);

        // quiz generated with this is stored in Database. Find it via the uuid we have, and return it 
        Future<Quiz> futureQuiz = GetResponseOrWait(generatedId);
        Quiz response = futureQuiz.get();

        ObjectMapper objectMapper = new ObjectMapper();
        String responseJSON = objectMapper.writeValueAsString(response);
        logger.info(responseJSON);
        return responseJSON;
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
    public QuizDto GetQuiz(@PathVariable String id) throws QuizNotFoundException {
        Quiz quiz =  quizService.GetQuizById(id);
        var quizDto = modelMapper.map(quiz, QuizDto.class);
        return quizDto;
    }

    @DeleteMapping("/quiz/{id}")
    public void DeleteQuiz(@PathVariable String id) throws QuizNotFoundException {
        quizService.DeleteQuiz(id);
    }
    
    private CompletableFuture<Quiz> GetResponseOrWait(String generatedId) throws QuizNotFoundException, TimeoutException {
        long startTime = System.currentTimeMillis();
        long timeout = 60000; // Timeout in milliseconds

        CompletableFuture<Quiz> futureResponse = new CompletableFuture<>();
        Quiz response = null;

        while (System.currentTimeMillis() - startTime < timeout) {
            // Check if entry is present in the database table
            boolean entryExists = checkEntryInTable(generatedId);

            if (entryExists) {
                response = quizService.GetQuizById(generatedId);
                futureResponse.complete(response);
                // accountService.MqDelete(response);
                return futureResponse;
            }

            // Wait for 100 milliseconds before checking again
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        throw  new TimeoutException("Timeout: Took too long to fetch (> 5seconds) " + generatedId);
    }

    private boolean checkEntryInTable(String correlationId) {
        return quizService.isEntryExistsByGeneratedId(correlationId);
    }

    // @GetMapping("/quizAttempt/{id}")
    // public QuizAttemptDto GetQuizAttempt(@PathVariable Long id) throws QuizAttemptNotFoundException {
        
    //     QuizAttempt quizAttempt =  quizService.GetQuizAttemptById(id);
    //     var quizAttemptDto = modelMapper.map(quizAttempt, QuizAttemptDto.class);
    //     return quizAttemptDto;
    // }

    @PostMapping("/quizAttempt")
    public QuizAttemptDto createQuizAttempt(@RequestBody QuizAttemptDto newQuizAttempt) {
        String generatedId = UUID.randomUUID().toString(); // for the attempt 
        newQuizAttempt.setQuizAttemptId(generatedId);

        for (int i = 0; i < newQuizAttempt.userAnswerList.size(); i++) {
            String answerId = UUID.randomUUID().toString();
            newQuizAttempt.userAnswerList.get(i).setUserAnswerId(answerId);
        }

        logger.info(newQuizAttempt.toString());
        
        var quizAttempt = modelMapper.map(newQuizAttempt, QuizAttempt.class);
        newQuizAttempt = modelMapper.map(quizService.SaveQuizAttempt(quizAttempt), QuizAttemptDto.class);
        return newQuizAttempt;
    }

}
