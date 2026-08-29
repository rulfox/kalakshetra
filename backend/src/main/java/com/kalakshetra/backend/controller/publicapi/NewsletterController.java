package com.kalakshetra.backend.controller.publicapi;

import com.kalakshetra.backend.dto.NewsletterDtos.SubscribeRequest;
import com.kalakshetra.backend.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/newsletter")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping
    public ResponseEntity<Void> subscribe(@Valid @RequestBody SubscribeRequest request) {
        newsletterService.subscribe(request.email());
        return ResponseEntity.accepted().build();
    }
}
