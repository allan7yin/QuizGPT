package com.quizGpt.accountManagement.User.Service;

import com.quizGpt.accountManagement.User.Entity.User;

public interface UserService {
    User createUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    User getUserByID(Long id);

    User getUserByEmail(String email);

    User getUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
