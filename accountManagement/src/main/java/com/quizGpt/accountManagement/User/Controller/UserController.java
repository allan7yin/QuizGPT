package com.quizGpt.accountManagement.User.Controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizGpt.accountManagement.User.Dto.UserDto;
import com.quizGpt.accountManagement.User.Entity.User;
import com.quizGpt.accountManagement.User.Service.UserServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private ModelMapper modelMapper;

    private UserServiceImpl userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable(name = "id") Long id) {

        User user = userService.getUserByID(id);
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        User userRequest = modelMapper.map(userDto, User.class);
        
        if (userService.existsByUsername(userRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("ERROR: this username has already been used - " + userRequest.getUsername());
        }

        if (userService.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("ERROR: this email has already been used - " + userRequest.getEmail());
        }

        User user = userService.createUser(userRequest);
        UserDto userResponseDto = modelMapper.map(user, UserDto.class);
        return new ResponseEntity<UserDto>(userResponseDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        User userRequest = modelMapper.map(userDto, User.class);
        User user = userService.updateUser(id, userRequest);

        UserDto userResponseDto = modelMapper.map(user, UserDto.class);

        return new ResponseEntity<UserDto>(userResponseDto, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<String> ("Sucess: User with " + id + " has been deleted", HttpStatus.OK);
    }
    
}
