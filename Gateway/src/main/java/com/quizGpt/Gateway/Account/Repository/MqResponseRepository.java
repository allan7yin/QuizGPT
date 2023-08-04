package com.quizGpt.Gateway.Account.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizGpt.Gateway.Account.Entity.MqResponse;

public interface MqResponseRepository extends JpaRepository<MqResponse, String> {
    MqResponse findFirstByResponseContaining(String correlationIdOrUsername); // there is no need to implement. Via keywords, Spring Data JPA auto implemenets for us
    boolean existsBycorrelationId(String correlationId);
}