package com.kalakshetra.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.revalidation")
public record RevalidationProperties(String url, String secret, boolean enabled) {}
