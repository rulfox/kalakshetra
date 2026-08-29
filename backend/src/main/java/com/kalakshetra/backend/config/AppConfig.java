package com.kalakshetra.backend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableJpaAuditing
@EnableAsync
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class, S3Properties.class, RevalidationProperties.class})
public class AppConfig {}
