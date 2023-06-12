package com.quizGpt.accountManagement.Role.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizGpt.accountManagement.Role.Constant.Roles;
import com.quizGpt.accountManagement.Role.Entity.Role;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // ?
    Optional<Role> findByName(Roles name);
}
