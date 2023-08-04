package com.quizGpt.Gateway.Config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    // Routing Keys 
    @Value("${gpt.request.rabbitmq.routing.key}")
    private String GPT_REQUEST_ROUTING_KEY;

    @Value("${gpt.response.rabbitmq.routing.key}")
    private String GPT_RESPONSE_ROUTING_KEY;

    @Value("${rabbitmq.auth.login.queue.routing.key}")
    private String LOGIN_QUEUE_ROUTING_KEY;

    @Value("${rabbitmq.auth.signup.queue.routing.key}")
    private String SIGN_UP_QUEUE_ROUTING_KEY;

    @Value("${to.gateway.login.response.queue.routing.key}") // res login routing key
    private String auth_login_response_queue_routing_key;

    @Value("${to.gateway.sign.up.response.queue.routing.key}") // res sign up routing key
    private String auth_sign_up_response_queue_routing_key;
    
    // queues being published to from 
    @Value("${to.gpt.rabbitmq.request.queue}")
    private String GPT_REQUEST_QUEUE;

    @Value("${to.gateway.gpt.rabbitmq.response.queue}")
    private String GPT_RESPONSE_QUEUE;

    @Value("${to.auth.rabbitmq.request.queue.login}")
    private String AUTH_LOGIN_REQUEST_QUEUE;

    @Value("${to.auth.rabbitmq.request.queue.sign.up}")
    private String AUTH_SIGNUP_REQUEST_QUEUE;

    @Value("${to.gateway.login.response.queue}") //res queue name 
    private String auth_login_response_queue;

    @Value("${to.gateway.sign.up.response.queue}") // res queue name 
    private String auth_sign_up_response_queue;

    // exchanges 

    @Value("${rabbitmq.gpt.exchange}")
    private String GPT_EXCHANGE;

    @Value("${rabbitmq.auth.exchange}")
    private String AUTH_EXCHANGE;

    // request Queues 
    @Bean
    public Queue GptRequestQueue(){
        return new Queue(GPT_REQUEST_QUEUE, false);
    }

    @Bean
    public Queue AuthLoginResponseQueue(){
        return new Queue(AUTH_LOGIN_REQUEST_QUEUE, true);
    }
    @Bean
    public Queue AuthSignupResponseQueue(){
        return new Queue(AUTH_SIGNUP_REQUEST_QUEUE, true);
    }

    // response Queues 
    @Bean
    public Queue GptResponseQueue(){
        return new Queue(GPT_RESPONSE_QUEUE, false);
    }

    @Bean
    public Queue ResAuthLoginResponseQueue(){
        return new Queue(auth_login_response_queue, true);
    }
    @Bean
    public Queue ResAuthSignupResponseQueue(){
        return new Queue(auth_sign_up_response_queue, true);
    }

    // we are making it so there is one route key per "path", so we set this up as a direct exchange 
    @Bean
    public DirectExchange GptExchange(){
        return new DirectExchange(GPT_EXCHANGE);
    }
    @Bean
    public DirectExchange AuthExchange(){
        return new DirectExchange(AUTH_EXCHANGE);
    }

    // bind the queues to the exchanges 

    @Bean
    public Binding GptRequestBinding(){
        return BindingBuilder
                .bind(GptRequestQueue())
                .to(GptExchange())
                .with(GPT_REQUEST_ROUTING_KEY);
    }

    @Bean
    public Binding LoginBinding(){
        return BindingBuilder
                .bind(AuthLoginResponseQueue())
                .to(AuthExchange())
                .with(LOGIN_QUEUE_ROUTING_KEY);
    }

    @Bean
    public Binding SignUpBinding(){
        return BindingBuilder
                .bind(AuthSignupResponseQueue())
                .to(AuthExchange())
                .with(SIGN_UP_QUEUE_ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding ResLoginBinding(){
        return BindingBuilder
                .bind(ResAuthLoginResponseQueue())
                .to(AuthExchange())
                .with(auth_login_response_queue_routing_key);
    }

    @Bean
    public Binding ResSignUpBinding(){
        return BindingBuilder
                .bind(ResAuthSignupResponseQueue())
                .to(AuthExchange())
                .with(auth_sign_up_response_queue_routing_key);
    }

    @Bean
    public Binding GptResponseBinding(){
        return BindingBuilder
                .bind(GptResponseQueue())
                .to(GptExchange())
                .with(GPT_RESPONSE_ROUTING_KEY);
    }


    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
