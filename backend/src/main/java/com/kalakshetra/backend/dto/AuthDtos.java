package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public class AuthDtos {

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}

    public record RefreshRequest(@NotBlank String refreshToken) {}

    public record LogoutRequest(@NotBlank String refreshToken) {}

    public record AuthResponse(
            String accessToken,
            String refreshToken,
            Instant accessTokenExpiresAt,
            String displayName) {}
}
