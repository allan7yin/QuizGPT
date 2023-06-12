package com.quizGpt.formManagement.Account.Service;

import org.springframework.amqp.core.MessageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizGpt.formManagement.Account.Entity.MqResponse;
import com.quizGpt.formManagement.Account.Repository.MqResponseRepository;

import org.springframework.beans.factory.annotation.Value;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
public class AuthMqServiceImpl implements AuthMqService {

    // establish RabbitMQ connection and broadcast message to one of the queues 
    private RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.auth.exchange}")
    private String AUTH_EXCHANGE;

    @Value("${rabbitmq.auth.login.queue.routing.key}")
    private String LOGIN_QUEUE_ROUTING_KEY;

    @Value("${rabbitmq.auth.signup.queue.routing.key}")
    private String SIGN_UP_QUEUE_ROUTING_KEY;

    private ObjectMapper jsonMapper;
    private final MqResponseRepository mqResponseRepository;

    private final Logger logger = LoggerFactory.getLogger(AuthMqServiceImpl.class);

    public AuthMqServiceImpl(RabbitTemplate rabbitTemplate, ObjectMapper jsonMapper, MqResponseRepository mqResponseRepository) {
        this.rabbitTemplate = rabbitTemplate;
        this.jsonMapper = jsonMapper;
        this.mqResponseRepository = mqResponseRepository;
    }

    @Override
    public <T> String SendLoginRequestDto(T loginRequestMessage) throws JsonProcessingException {
        return SendMessageToQueue(LOGIN_QUEUE_ROUTING_KEY, loginRequestMessage);
    }

    @Override
    public <T> String SendSignUpRequestDto(T SignUpRequestMessage) throws JsonProcessingException {
        return SendMessageToQueue(SIGN_UP_QUEUE_ROUTING_KEY, SignUpRequestMessage);
    }

    @Override
    @RabbitListener(queues = "${to.gateway.login.response.queue}")
    public void ConsumeLoginMessageFromMQ(Object incomingMessage) {
        try {
            save(incomingMessage); // need to cast this to a Message type 
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    
    @Override
    @RabbitListener(queues = "${to.gateway.sign.up.response.queue}")
    public void ConsumeSignUpMessageFromMQ(Object incomingMessage) {
        try {
            save(incomingMessage);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private void save(Object incomingMessage) throws UnsupportedEncodingException {
        // first, cast this into a message type 
        Message message = (Message) incomingMessage;
        String correlationID = message.getMessageProperties().getCorrelationId();
        
        String JSON = new String(message.getBody(), "UTF-8");
        logger.info(JSON);

        try {
            mqResponseRepository.save( new MqResponse(correlationID, JSON));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private <T> String SendMessageToQueue(String routingKey, T message) throws JsonProcessingException {
        // this method will deal with 2 queues, login queue and sign-up queue 
        // using direct queue, will need routing key to divert messages to respective destination queues 
        String outputMessage;
        try {
            outputMessage = jsonMapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e.getMessage());
        }

        String correlationId = UUID.randomUUID().toString();
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.setCorrelationId(correlationId);
        Message deliverable = new Message(outputMessage.getBytes(), messageProperties);
        // effectively, we are attatching correlationID to the message, and converting to binary array format - neccessary for network protocols such as RabbitMQ
        
        rabbitTemplate.convertAndSend(AUTH_EXCHANGE, routingKey, deliverable);
        return correlationId;
    }

    public boolean isEntryExistsByCorrelationId(String correlationId) {
        return mqResponseRepository.existsById(correlationId);
    }

}
