package com.kalakshetra.backend.controller.admin;

import com.kalakshetra.backend.dto.NewsletterDtos.SubscriberResponse;
import com.kalakshetra.backend.service.NewsletterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/newsletter-subscribers")
public class AdminNewsletterController {

    private final NewsletterService newsletterService;

    public AdminNewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping
    public Page<SubscriberResponse> list(Pageable pageable) {
        return newsletterService.list(pageable);
    }
}
