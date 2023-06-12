package com.quizGpt.formManagement.Account.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizGpt.formManagement.Account.Dto.LoginRequestDto;
import com.quizGpt.formManagement.Account.Dto.LoginResponseDto;
import com.quizGpt.formManagement.Account.Dto.SignUpRequestDto;
import com.quizGpt.formManagement.Account.Entity.MqResponse;
import com.quizGpt.formManagement.Account.Exception.CorrelationIdNotFound;
import com.quizGpt.formManagement.Account.Service.AccountService;
import com.quizGpt.formManagement.Account.Service.AuthMqServiceImpl;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeoutException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotNull;


@RestController
@RequestMapping("/api")
public class AccountController {
    private AccountService accountService;
    private AuthMqServiceImpl authMqService;
    private HttpSession session; // we'll use this to set the session period to around one week 
    private ObjectMapper objectMapper;

    private final Logger logger = LoggerFactory.getLogger(AccountController.class);

    public AccountController(AuthMqServiceImpl authMqService, AccountService accountService, HttpSession session, ObjectMapper objectMapper ) {
        this.accountService = accountService;
        this.authMqService = authMqService;
        this.session = session;
        this.objectMapper = objectMapper;
    }

    // Spring takes care of mapping the JSON (or other standard data formats) into Java object (however, needs to be a valid one, otherwise, error)
    @PostMapping("/account/login")
    public @NotNull ResponseEntity LoginUser(@RequestBody LoginRequestDto request) throws JsonProcessingException, CorrelationIdNotFound, 
    InterruptedException, ExecutionException, TimeoutException {
        String correlationID = authMqService.SendLoginRequestDto(request); // this will result in the message's response being saved in db, wait and obtain it
        
        Future<String> response = GetResponseOrWait(correlationID);
        String trueResponse = response.get();
        

        LoginResponseDto loginDto = null;
        if (trueResponse != null) {

            logger.info(trueResponse);

            loginDto = objectMapper.readValue(trueResponse, LoginResponseDto.class);

            session.setAttribute("username", loginDto.getUsername());
            session.setAttribute("roles", loginDto.getRoles());
        }
        
        if (loginDto.getStatusCodeValue() == 200) {
            return ResponseEntity.ok(loginDto);
        } else {// if (loginDto.getStatusCodeValue() == 400) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginDto);
        }
    }

    @PostMapping("/account/signup")
    public @NotNull ResponseEntity SignUpUser(@RequestBody SignUpRequestDto request) throws JsonProcessingException, TimeoutException, CorrelationIdNotFound, InterruptedException, ExecutionException {
        SignUpRequestDto loginDto = null;
        authMqService.SendSignUpRequestDto(request); 

        Future<String> response = GetResponseOrWait(request.getUsername());
        String trueResponse = response.get();
        
        if (trueResponse != null) {

            loginDto = objectMapper.readValue(trueResponse, SignUpRequestDto.class);
        }
        return ResponseEntity.ok(loginDto);
    }

    @GetMapping("/account/logout")
    public void Logout() {
        session.invalidate();
    }

    private CompletableFuture<String> GetResponseOrWait(String correlationId) throws TimeoutException, CorrelationIdNotFound, InterruptedException {
        long startTime = System.currentTimeMillis();
        long timeout = 5000; // Timeout in milliseconds

        CompletableFuture<String> futureResponse = new CompletableFuture<>();
        MqResponse response = null;

        while (System.currentTimeMillis() - startTime < timeout) {
            // Check if entry is present in the database table
            boolean entryExists = checkEntryInTable(correlationId);

            if (entryExists) {
                response = accountService.FindMqResponseByCorelationId(correlationId);
                logger.info(response.getResponse());
                futureResponse.complete(response.getResponse().replace("response=", ""));
                accountService.MqDelete(response);
                return futureResponse;
            }

            // Wait for 100 milliseconds before checking again
            Thread.sleep(100);
        }

        throw  new TimeoutException("Timeout: Took too long to fetch (> 5seconds) " + correlationId);
    }

    private boolean checkEntryInTable(String correlationId) {
        return authMqService.isEntryExistsByCorrelationId(correlationId);
    }
}
