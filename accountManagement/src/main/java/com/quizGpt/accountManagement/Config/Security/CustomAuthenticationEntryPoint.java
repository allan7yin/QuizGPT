package com.quizGpt.accountManagement.Config.Security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// will be called if the authentication process fails 
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint{

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        logger.error("ERROR: Unauthorized", authException.getMessage());
        
        // Set the response status code to 401 (Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        
        // Get a PrintWriter to write the response body -> this goes directly to the response's output stream 
        PrintWriter writer = response.getWriter();
        
        // Write a custom error message to the response
        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        ObjectMapper objectMapper = new ObjectMapper();
        writer.println(objectMapper.writeValueAsString(body));

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "ERROR: Unauthorized.");
    }
    
}
