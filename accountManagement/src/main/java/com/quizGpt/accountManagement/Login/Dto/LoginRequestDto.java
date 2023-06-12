package com.quizGpt.accountManagement.Login.Dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginRequestDto implements Serializable{
    @NotBlank
    private String Username;

    @NotBlank
    private String Password;
}
