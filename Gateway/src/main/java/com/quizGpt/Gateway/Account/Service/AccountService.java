package com.quizGpt.Gateway.Account.Service;

import com.quizGpt.Gateway.Account.Entity.MqResponse;
import com.quizGpt.Gateway.Account.Exception.CorrelationIdNotFound;

public interface AccountService {
    public MqResponse FindMqResponseByCorrelationId(String correlationId) throws CorrelationIdNotFound;

    public MqResponse FindFirstMqResponse(String correlationIdOrUsername) throws CorrelationIdNotFound;

    public void MqDelete(MqResponse response);

    public MqResponse FindFirstByResponseContaining(String username);
}
