package com.quizGpt.Gateway.Quiz.Service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.quizGpt.Gateway.Quiz.Dto.CreateQuizRequestDto;
import com.quizGpt.Gateway.Quiz.Dto.QuizDto;
import com.quizGpt.Gateway.Quiz.Entity.Quiz;
import com.quizGpt.Gateway.Quiz.Repository.QuizRepository;

import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class RabbitMqServiceImpl implements ProducerService, ConsumerService{

    private final Logger logger = LoggerFactory.getLogger(RabbitMqServiceImpl.class);

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.gpt.exchange}")
    private String GPT_EXCHANGE;
    
    @Value("${gpt.request.rabbitmq.routing.key}")
    private String GPT_REQUEST_ROUTING_KEY;

    // @Value("{form.management.rabbitmq.sender}")
    // private String SENDER;

    public RabbitMqServiceImpl(String GPT_EXCHANGE, String GPT_ROUTING_KEY, String AUTH_ROUTING_KEY, QuizRepository quizRepository, RabbitTemplate rabbitTemplate) {
        this.GPT_EXCHANGE = GPT_EXCHANGE;
        this.GPT_REQUEST_ROUTING_KEY = GPT_ROUTING_KEY;
        this.GPT_EXCHANGE = AUTH_ROUTING_KEY;
        // this.SENDER = SENDER;
        this.quizRepository = quizRepository;
        this.rabbitTemplate = rabbitTemplate;
    }
    
    @Override
    public void SendMessageToGptServer(CreateQuizRequestDto message) {
        rabbitTemplate.convertAndSend(GPT_EXCHANGE, GPT_REQUEST_ROUTING_KEY, message);
    }

    //// NEED TO FIX THIS
    @Override
    @RabbitListener(queues = {"${to.gateway.gpt.rabbitmq.response.queue}"})
    public void ConsumeMessageFromGptServer(QuizDto responseMessage) throws JsonProcessingException {
        // we want to save this to the database. Convert to different types to be able to do so. 
        ModelMapper dtoToJavaobjectMapper = new ModelMapper();

        // String json = jsonToJavaObjectMapper.writeValueAsString(responseMessage);
        Quiz quiz = dtoToJavaobjectMapper.map(responseMessage, Quiz.class);
        // Long quizId = quiz.getId();
        // json = jsonToJavaObjectMapper.writeValueAsString(quiz);
        logger.info(quiz.toString());
        quizRepository.save(quiz);
    }
}
