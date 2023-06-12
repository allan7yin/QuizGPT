package com.quizGpt.formManagement.Account.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.quizGpt.formManagement.Account.Entity.MqResponse;
import com.quizGpt.formManagement.Account.Exception.CorrelationIdNotFound;
import com.quizGpt.formManagement.Account.Repository.MqResponseRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AccountServiceImpl implements AccountService{

    private MqResponseRepository mqResponseRepository;

    @Override
    public MqResponse FindMqResponseByCorelationId(String correlationId) throws CorrelationIdNotFound {
        // like to use <Optional> when the thing being returned may not be present. Often used when querying database
        Optional<MqResponse> response = mqResponseRepository.findById(correlationId);

        if (response.isPresent()) {
            return response.get(); // we use the .get(  ) method to obtain the value stored within the optional 
        } else {
            throw new CorrelationIdNotFound("error: mq with id" + correlationId + " not found");
        }
    }

    @Override
    public MqResponse FindFirstMqResponse(String correlationIdOrUsername) throws CorrelationIdNotFound {
        Optional<MqResponse> response = Optional.ofNullable(mqResponseRepository.findFirstByResponseContaining(correlationIdOrUsername));
        
        if (response.isPresent()) {
            return response.get(); // we use the .get() method to obtain the value stored within the optional 
        } else {
            throw new CorrelationIdNotFound(correlationIdOrUsername + " not found. Continuing to look ...");
            // ok to see in terminal. Means looked and not there, as we are probing the db multiple times wihtin timeout timeframe
        }
    }

    @Override
    public void MqDelete(MqResponse response) {
        mqResponseRepository.delete(response);
    }
    
}
