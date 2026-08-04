package com.ampartechnova.api.admin;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminSessionRepository extends JpaRepository<AdminSession, UUID> {
    Optional<AdminSession> findByTokenHash(String tokenHash);
    void deleteByTokenHash(String tokenHash);
}
