package com.quizGpt.Gateway.Account.Dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponseDto {
    private String token;
    private String authScheme;
    private int id;
    private String username;
    private String email;
    private List<String> roles;

    @JsonProperty("statusCode")
    private String statusCode;

    @JsonProperty("statusCodeValue")
    private int statusCodeValue;
}

