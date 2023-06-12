package com.quizGpt.accountManagement.Login.Service;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizGpt.accountManagement.Config.RabbitMq.RabbitMqConfig;
import com.quizGpt.accountManagement.Login.Controller.LoginController;
import com.quizGpt.accountManagement.Login.Dto.LoginRequestDto;
import com.quizGpt.accountManagement.User.Controller.UserController;
import com.quizGpt.accountManagement.User.Dto.UserDto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
public class RabbitMqServiceImpl implements ConsumerService {
    
    @Value("${rabbitmq.auth.exchange}")
    private String response_exchange;

    @Value("${to.gateway.login.response.queue.routing.key}")
    private String login_response_routing_key;

    @Value("${to.gateway.sign.up.response.queue.routing.key}")
    private String sign_up_response_routing_key;

    private RabbitTemplate rabbitTemplate;

    private LoginController loginController;
    
    private UserController userController;

    private final Logger logger = LoggerFactory.getLogger(RabbitMqServiceImpl.class);

    public RabbitMqServiceImpl(RabbitTemplate rabbitTemplate, LoginController loginController, UserController userController) {
        this.rabbitTemplate = rabbitTemplate;
        this.loginController = loginController;
        this.userController = userController;
    }

    @Override
    @RabbitListener(queues = "${to.auth.rabbitmq.request.queue.login}") 
    public void ReadLoginRequestFromGatewayServer(Message message) {
        // a layer ontop of the controller 
        logger.info("Received login request for: " + message);

        MessageProperties messageProperties = message.getMessageProperties();

        ObjectMapper mapper = new ObjectMapper();
        LoginRequestDto loginRequestDto = null;
        try {
            loginRequestDto = mapper.readValue(new String(message.getBody(), StandardCharsets.UTF_8), LoginRequestDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        ResponseEntity<?> response = loginController.authenticateUser(loginRequestDto);

        logger.info(loginRequestDto.toString());
        MessageProperties responseProperties = new MessageProperties();
        responseProperties.setCorrelationId(messageProperties.getCorrelationId());

        byte[] responseBody = null;
        try {
            responseBody = mapper.writeValueAsBytes(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Message deliverable = new Message(responseBody, messageProperties);

        rabbitTemplate.convertAndSend(response_exchange, sign_up_response_routing_key, deliverable);
        logger.info("Response sent for: " + message);
    }

    @Override
    @RabbitListener(queues = "${to.auth.rabbitmq.request.queue.sign.up}") 
    public void ReadSignUpRequestFromGatewayServer(Message message) {
        // a layer ontop of the controller 
        logger.info("Received sign up request for: " + message);

        MessageProperties messageProperties = message.getMessageProperties();
        // Long correlationId = UUID.fromString(messageProperties.getCorrelationId()).getMostSignificantBits();
        ObjectMapper mapper = new ObjectMapper();
        UserDto userDto = null;
        try {
            userDto = mapper.readValue(new String(message.getBody(), StandardCharsets.UTF_8), UserDto.class);
            // userDto.setId(correlationId);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        logger.info(userDto.toString());

        ResponseEntity<?> response = userController.createUser(userDto);
        MessageProperties responseProperties = new MessageProperties();
        responseProperties.setCorrelationId(messageProperties.getCorrelationId());

        byte[] responseBody = null;
        try {
            responseBody = mapper.writeValueAsBytes(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Message deliverable = new Message(responseBody, messageProperties);

        rabbitTemplate.convertAndSend(response_exchange, sign_up_response_routing_key, deliverable);
        logger.info("Response sent for: " + message);
    }

    
}
