package com.kalakshetra.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.s3")
public record S3Properties(
        String bucket,
        String region,
        String publicBaseUrl,
        long presignExpirySeconds) {}
