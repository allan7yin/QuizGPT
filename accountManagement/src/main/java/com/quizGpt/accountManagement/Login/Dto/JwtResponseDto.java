package com.quizGpt.accountManagement.Login.Dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class JwtResponseDto {
    @NotBlank
    private String token;
    
    private String authScheme = "Bearer";

    @NotBlank
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private List<String> Roles;

    public JwtResponseDto(String token, Long id, String username, String email, List<String> Roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.Roles = Roles;
    }
}
