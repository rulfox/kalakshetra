package com.kalakshetra.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Generic key/value editable text block (Hero headline, Philosophy quote, Contact info, ...).
 * The set of valid keys is enforced by {@code SiteContentKeys}, not by the DB schema, so the
 * admin UI can group/label them without the backend needing a table per section.
 */
@Entity
@Table(name = "site_content")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteContent extends AuditedEntity {

    @Column(name = "content_key", nullable = false, unique = true, length = 120)
    private String key;

    @Column(name = "content_value", nullable = false, columnDefinition = "TEXT")
    private String value;

    @Column(nullable = false, length = 150)
    private String label;

    @Column(name = "content_group", nullable = false, length = 50)
    private String group;
}
