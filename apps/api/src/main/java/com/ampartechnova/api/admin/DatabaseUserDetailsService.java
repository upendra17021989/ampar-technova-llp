package com.ampartechnova.api.admin;

import java.util.Arrays;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final AdminUserRepository repository;

    public DatabaseUserDetailsService(AdminUserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser account = repository.findByUsernameIgnoreCase(username.trim())
                .orElseThrow(() -> new UsernameNotFoundException("Administrator account not found"));

        String[] roles = Arrays.stream(account.getRoles().split(","))
                .map(String::trim)
                .filter(role -> !role.isBlank())
                .toArray(String[]::new);

        return User.withUsername(account.getUsername())
                .password(account.getPasswordHash())
                .roles(roles)
                .disabled(!account.isEnabled())
                .build();
    }
}
