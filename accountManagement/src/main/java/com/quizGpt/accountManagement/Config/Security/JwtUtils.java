package com.quizGpt.accountManagement.Config.Security;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    // generate the jwt for us, given private ket, username, and password 

    @Value("${quizgpt.account.management.jwt.secret.key}")
    private String JWT_SECRET_KEY;

    @Value("${quizgpt.account.management.jwt.expiration.time.ms}")
    private int JWT_EXPIRATION_TIME_MS;

    // public JwtUtils() {
    //     SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    //     this.JWT_SECRET_KEY = key.toString();
    // }
    
    public String generateJwt(Authentication authentication) {
        // generate jwt 
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        Date expirationDate = new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME_MS);
        String username = userPrincipal.getUsername();

        byte[] secretBytes = JWT_SECRET_KEY.getBytes();
        SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes);

        String token = "";

        try {
            token = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(expirationDate)
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return token;
    }

    public String getUsernameFromJwt(String token) {
        String username = "";

        byte[] secretBytes = JWT_SECRET_KEY.getBytes();
        SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes);

        try {
            JwtParser parser = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build();
            
            Claims claims = parser.parseClaimsJws(token).getBody();
            username = claims.getSubject();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return username;
    }

    public List<String> getInfoFromFireBaseToken(String token) {
        String email = "";
        String username = "";


        byte[] secretBytes = JWT_SECRET_KEY.getBytes();
        SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes);

        try {
            JwtParser parser = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build();
            
            Claims claims = parser.parseClaimsJws(token).getBody();
            email = (String) claims.get("email");
            username = (String) claims.get("name");
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        List<String> pair = new ArrayList<>();
        pair.add(username);
        pair.add(email);
        return pair;
    }
    
    public boolean validateJwtToken(String token) {
        boolean validity = false;

        try {
            // Provide the same secret key used to sign the JWT
            byte[] secretBytes = JWT_SECRET_KEY.getBytes();
            SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes);
    
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    
            // If no exception occurs during parsing, the token is valid
            validity = true;
        } catch (Exception e) {
            validity = false;
        }

        return validity;
    }
}
