package com.quizGpt.Gateway.Account.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.quizGpt.Gateway.Account.Entity.MqResponse;
import com.quizGpt.Gateway.Account.Exception.CorrelationIdNotFound;
import com.quizGpt.Gateway.Account.Repository.MqResponseRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AccountServiceImpl implements AccountService{

    private MqResponseRepository mqResponseRepository;

    @Override
    public MqResponse FindMqResponseByCorrelationId(String correlationId) throws CorrelationIdNotFound {
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
    
    @Override
    public MqResponse FindFirstByResponseContaining(String username) {
        // Use the findOne() method to retrieve the MqResponse entity by CorrelationId
        Optional<MqResponse> optionalMqResponse = Optional.ofNullable(mqResponseRepository.findFirstByResponseContaining(username));

        // Check if the entity was found and return it, otherwise return null or throw an exception as needed
        if (optionalMqResponse.isPresent()) {
            return optionalMqResponse.get();
        } else {
            return null; // or throw an exception
        }
    }
    
}
