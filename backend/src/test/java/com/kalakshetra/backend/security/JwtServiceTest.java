package com.kalakshetra.backend.security;

import static org.assertj.core.api.Assertions.assertThat;

import com.kalakshetra.backend.config.JwtProperties;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private final JwtProperties properties = new JwtProperties("test-secret-key-at-least-32-bytes-long!!", 3600, 2_592_000);
    private final JwtService jwtService = new JwtService(properties);

    @Test
    void generatesAndValidatesAToken() {
        String token = jwtService.generateAccessToken("studio-admin");

        var username = jwtService.validateAndExtractUsername(token);

        assertThat(username).contains("studio-admin");
    }

    @Test
    void rejectsATamperedToken() {
        String token = jwtService.generateAccessToken("studio-admin");
        String tampered = token.substring(0, token.length() - 2) + "xx";

        var username = jwtService.validateAndExtractUsername(tampered);

        assertThat(username).isEmpty();
    }

    @Test
    void rejectsGarbageInput() {
        assertThat(jwtService.validateAndExtractUsername("not-a-jwt")).isEmpty();
    }
}
