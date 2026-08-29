package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.NewsletterSubscriber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {
    boolean existsByEmailIgnoreCase(String email);
    Page<NewsletterSubscriber> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
