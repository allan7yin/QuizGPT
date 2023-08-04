package com.quizGpt.Gateway.Account.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginRequestDto {
    @NotBlank
    private String Username;

    @NotBlank
    private String Password;
}
