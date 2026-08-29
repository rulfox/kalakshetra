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
@Table(name = "lookbook_slide")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LookbookSlide extends AuditedEntity {

    @Column(nullable = false, length = 1000)
    private String imageUrl;

    @Column(length = 300)
    private String imageAlt;

    @Column(length = 500)
    private String s3Key;

    @Column(length = 120)
    private String eyebrow;

    @Column(length = 300)
    private String caption;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
