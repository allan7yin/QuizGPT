package com.quizGpt.accountManagement.Config.Security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quizGpt.accountManagement.User.Entity.User;

public class UserDetailsImpl implements UserDetails{

    private final Long id;

    private final String username;

    private final String email;

    private boolean isAccountNonExpired;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;

    @JsonIgnore
    private String password;

    Collection<? extends GrantedAuthority> grantedAuthorities;

    public UserDetailsImpl(Long id, 
                        String username, 
                        String email, 
                        String password, 
                        Collection<? extends GrantedAuthority> grantedAuthorities, 
                        boolean isAccountNonExpired,
                        boolean isAccountNonLocked, 
                        boolean isCredentialsNonExpired,
                        boolean isEnabled
        ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.grantedAuthorities = grantedAuthorities;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

    // provide a method that takes a user entity, and extracts core information to make a UserDetails object 
    public static UserDetailsImpl build(User user) {
        // map the set of roles of the user to a list of GrantedAuthority

        // learned streams, try using 
        List<GrantedAuthority> roles = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().name())) // inside of the .map(), define the mapping function. This is very simialer to Racket/Functional Programming 
            .collect(Collectors.toList());

        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), roles, true, true, true, true);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        } 

        if (object == null || getClass() != object.getClass()) {
            return false;
        }
        
        UserDetailsImpl user = (UserDetailsImpl) object;
        return Objects.equals(id, user.id);
    }
    
}
