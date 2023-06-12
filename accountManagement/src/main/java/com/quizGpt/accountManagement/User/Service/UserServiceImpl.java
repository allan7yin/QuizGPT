package com.quizGpt.accountManagement.User.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.quizGpt.accountManagement.Role.Constant.Roles;
import com.quizGpt.accountManagement.Role.Entity.Role;
import com.quizGpt.accountManagement.Role.Repository.RoleRepository;
import com.quizGpt.accountManagement.User.Entity.User;
import com.quizGpt.accountManagement.User.Exception.UserAlreadyExistsException;
import com.quizGpt.accountManagement.User.Exception.UserNotFoundException;
import com.quizGpt.accountManagement.User.Repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
public class UserServiceImpl implements UserService{

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    PasswordEncoder encoder;

    private UserRepository userRepository;

    private RoleRepository roleRepository;
    
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        super();
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User userRequest) {
        Optional<User> result = userRepository.findByEmail(userRequest.getEmail());
        if (result.isPresent()) {
            throw new UserAlreadyExistsException("ERROR: this email has already been used - " + userRequest.getEmail());
        }

        result = userRepository.findByUsername(userRequest.getUsername());
        if (result.isPresent()) {
            throw new UserAlreadyExistsException("ERROR: this username has already been used - " + userRequest.getUsername());
        }

        // no error throw yet means valid new user registration 
        User user = new User(userRequest.getUsername(), userRequest.getEmail(), encoder.encode(userRequest.getPassword()));
        Set<Role> roles = new HashSet<>();
        // Role userRole = roleRepository.findByName(Roles.ADMIN)
        //         .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        Role userRole = new Role(Roles.ADMIN);
        roles.add(userRole);

        user.setRoles(roles);

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> result = userRepository.findById(id);
        if (!result.isPresent()) {
            throw new UserNotFoundException("ERROR: User with id: " + id + " does not exist. Unable to update.");
        }

        user.setUsername(user.getUsername());
        user.setPassword(encoder.encode(user.getPassword()));
        user.setEmail(user.getEmail());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> result = userRepository.findById(id);
        if (!result.isPresent()) {
            throw new UserNotFoundException("ERROR: User with id: " + id + " does not exist. Unable to delete.");
        }

        userRepository.deleteById(id);
    }

    @Override
    public User getUserByID(Long id) {
        Optional<User> result = userRepository.findById(id);
        if (!result.isPresent()) {
            throw new UserNotFoundException("ERROR: User with id: " + id + " does not exist. Unable to retrieve.");
        }

        return result.get();
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> result = userRepository.findByEmail(email);
        if (!result.isPresent()) {
            throw new UserNotFoundException("ERROR: User with email: " + email + " does not exist. Unable to retrieve.");
        }

        return result.get();
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        if (!result.isPresent()) {
            throw new UserNotFoundException("ERROR: User with username: " + username + " does not exist. Unable to retrieve.");
        }

        return result.get();
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }    
}

