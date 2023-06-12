package com.quizGpt.formManagement.Account.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignUpRequestDto {
    @NotBlank
    String username;

    @NotBlank
    String password;

    @NotBlank
    String email;
}
