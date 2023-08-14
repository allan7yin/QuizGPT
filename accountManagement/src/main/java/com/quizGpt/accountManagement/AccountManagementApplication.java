package com.quizGpt.accountManagement;

import java.io.FileInputStream;
import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@EnableRabbit
@SpringBootApplication
public class AccountManagementApplication {

	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
	
	public static void main(String[] args) throws IOException {
		FileInputStream serviceAccount =
			new FileInputStream("./quizgpt-1261b-firebase-adminsdk-45sou-c1ce48c210.json");

		FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
				
		FirebaseApp.initializeApp(options);
		SpringApplication.run(AccountManagementApplication.class, args);
	}

}
