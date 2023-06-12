package com.quizGpt.accountManagement.Login.Service;

import org.springframework.amqp.core.Message;

public interface ConsumerService {
    public void ReadLoginRequestFromGatewayServer(Message message);
    public void ReadSignUpRequestFromGatewayServer(Message message);
    
}
