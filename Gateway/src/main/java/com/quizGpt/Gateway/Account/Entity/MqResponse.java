package com.quizGpt.Gateway.Account.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RabbitMqResponse")
public class MqResponse {
    @Id
    private String correlationId;
    @NotNull
    @Column(length = Integer.MAX_VALUE)
    private String response;
}
