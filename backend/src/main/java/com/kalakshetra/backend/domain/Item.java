package com.kalakshetra.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item extends AuditedEntity {

    @Column(nullable = false, unique = true, length = 160)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 500)
    private String themeDescription;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 300)
    private String imageAlt;

    /** S3 object key, kept so we can delete the object when the image is replaced/record removed. */
    @Column(length = 500)
    private String s3Key;

    /** Tag accent color on the product card: gold | red | green | indigo. */
    @Column(nullable = false, length = 30)
    @Builder.Default
    private String categoryTone = "gold";

    /** Fallback CSS background behind the media box while no real photo exists yet. */
    @Column(length = 40)
    private String swatchColor;

    @Column(nullable = false)
    @Builder.Default
    private boolean comingSoon = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean published = true;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
