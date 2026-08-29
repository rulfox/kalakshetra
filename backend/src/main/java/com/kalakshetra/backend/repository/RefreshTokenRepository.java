package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
}
