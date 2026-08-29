package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public class NewsletterDtos {

    public record SubscribeRequest(@NotBlank @Email String email) {}

    public record SubscriberResponse(Long id, String email, String source, Instant subscribedAt) {}
}
