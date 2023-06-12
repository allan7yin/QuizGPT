package com.quizGpt.accountManagement;

import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@EnableRabbit
@SpringBootApplication
public class AccountManagementApplication {

	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
	
	public static void main(String[] args) {
		SpringApplication.run(AccountManagementApplication.class, args);
	}

}
