package com.kalakshetra.backend.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.cors")
public record CorsProperties(List<String> publicAllowedOrigins, List<String> adminAllowedOrigins) {}
