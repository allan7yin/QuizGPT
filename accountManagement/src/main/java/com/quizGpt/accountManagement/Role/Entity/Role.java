package com.quizGpt.accountManagement.Role.Entity;

import com.quizGpt.accountManagement.Role.Constant.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Role(Roles name) {
        this.name = name;
    }

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Roles name;
}
