package com.quizGpt.formManagement.Account.Service;

import com.quizGpt.formManagement.Account.Entity.MqResponse;
import com.quizGpt.formManagement.Account.Exception.CorrelationIdNotFound;

public interface AccountService {
    public MqResponse FindMqResponseByCorelationId(String correlationId) throws CorrelationIdNotFound;

    public MqResponse FindFirstMqResponse(String correlationIdOrUsername) throws CorrelationIdNotFound;

    public void MqDelete(MqResponse response);
}
