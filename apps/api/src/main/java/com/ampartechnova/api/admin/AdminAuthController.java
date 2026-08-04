package com.ampartechnova.api.admin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {
    private final AuthenticationManager authenticationManager;
    private final AdminSessionService sessions;

    public AdminAuthController(AuthenticationManager authenticationManager, AdminSessionService sessions) {
        this.authenticationManager = authenticationManager;
        this.sessions = sessions;
    }

    @PostMapping("/login")
    LoginResponse login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password()));
        AdminSessionService.IssuedSession session = sessions.create(authentication.getName());
        return new LoginResponse(session.token(), session.expiresAt(), authentication.getName());
    }

    @PostMapping("/logout")
    void logout(@RequestHeader("Authorization") String authorization) {
        if (authorization.startsWith("Bearer ")) sessions.revoke(authorization.substring(7));
    }

    @GetMapping("/me")
    MeResponse me(Authentication authentication) {
        return new MeResponse(authentication.getName());
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    void invalidCredentials() {
    }

    record LoginRequest(@NotBlank String username, @NotBlank String password) {}
    record LoginResponse(String token, java.time.Instant expiresAt, String username) {}
    record MeResponse(String username) {}
}
