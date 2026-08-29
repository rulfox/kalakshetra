package com.kalakshetra.backend.service;

import com.kalakshetra.backend.config.RevalidationProperties;
import java.time.Duration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

/**
 * Fires a best-effort, async "content changed" ping to the public Next.js site's on-demand
 * revalidation route after an admin mutation commits, so edits show up immediately instead of
 * waiting out the ISR cache TTL. Failures here must never fail the admin request that triggered
 * them — they're logged and swallowed.
 */
@Service
public class RevalidationService {

    private static final Logger log = LoggerFactory.getLogger(RevalidationService.class);

    private final RevalidationProperties properties;
    private final RestClient restClient;

    public RevalidationService(RevalidationProperties properties) {
        this.properties = properties;
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(Duration.ofSeconds(3));
        requestFactory.setReadTimeout(Duration.ofSeconds(3));
        this.restClient = RestClient.builder().requestFactory(requestFactory).build();
    }

    @Async
    public void notifyChanged(String tag) {
        if (!properties.enabled() || properties.url() == null || properties.url().isBlank()) {
            return;
        }
        try {
            restClient
                    .post()
                    .uri(properties.url() + "?secret={secret}&tag={tag}", properties.secret(), tag)
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            log.warn("Revalidation ping for tag '{}' failed: {}", tag, e.getMessage());
        }
    }
}
