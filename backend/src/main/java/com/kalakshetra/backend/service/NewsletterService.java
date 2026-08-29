package com.kalakshetra.backend.service;

import com.kalakshetra.backend.domain.NewsletterSubscriber;
import com.kalakshetra.backend.dto.NewsletterDtos.SubscriberResponse;
import com.kalakshetra.backend.exception.ApiExceptions.ConflictException;
import com.kalakshetra.backend.repository.NewsletterSubscriberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NewsletterService {

    private final NewsletterSubscriberRepository repository;

    public NewsletterService(NewsletterSubscriberRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void subscribe(String email) {
        String normalized = email.trim().toLowerCase();
        if (repository.existsByEmailIgnoreCase(normalized)) {
            throw new ConflictException("This email is already subscribed");
        }
        repository.save(NewsletterSubscriber.builder().email(normalized).source("website").active(true).build());
    }

    @Transactional(readOnly = true)
    public Page<SubscriberResponse> list(Pageable pageable) {
        return repository
                .findAllByOrderByCreatedAtDesc(pageable)
                .map(s -> new SubscriberResponse(s.getId(), s.getEmail(), s.getSource(), s.getCreatedAt()));
    }
}
