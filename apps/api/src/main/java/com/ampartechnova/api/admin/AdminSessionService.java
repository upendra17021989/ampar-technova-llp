package com.ampartechnova.api.admin;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminSessionService {
    private final AdminSessionRepository repository;
    private final Duration lifetime;
    private final SecureRandom secureRandom = new SecureRandom();

    public AdminSessionService(AdminSessionRepository repository,
            @Value("${app.admin.session-hours:8}") long sessionHours) {
        this.repository = repository;
        this.lifetime = Duration.ofHours(sessionHours);
    }

    @Transactional
    public IssuedSession create(String username) {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        Instant now = Instant.now();
        Instant expiresAt = now.plus(lifetime);
        repository.save(new AdminSession(hash(token), username, now, expiresAt));
        return new IssuedSession(token, expiresAt);
    }

    @Transactional(readOnly = true)
    public Optional<String> resolveUsername(String token) {
        if (token == null || token.isBlank()) return Optional.empty();
        return repository.findByTokenHash(hash(token))
                .filter(session -> session.getExpiresAt().isAfter(Instant.now()))
                .map(AdminSession::getUsername);
    }

    @Transactional
    public void revoke(String token) {
        if (token != null && !token.isBlank()) repository.deleteByTokenHash(hash(token));
    }

    private String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                    .digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is unavailable", exception);
        }
    }

    public record IssuedSession(String token, Instant expiresAt) {}
}
