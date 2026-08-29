package com.kalakshetra.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "newsletter_subscriber")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsletterSubscriber extends AuditedEntity {

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 100)
    private String source;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
