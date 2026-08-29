package com.kalakshetra.backend.dto;

import java.time.Instant;
import java.util.List;

public class LookbookDtos {

    public record LookbookSlideResponse(
            Long id,
            String imageUrl,
            String imageAlt,
            String eyebrow,
            String caption,
            Integer sortOrder,
            Instant updatedAt) {}

    public record LookbookSlideRequest(
            String imageUrl,
            String imageAlt,
            String s3Key,
            String eyebrow,
            String caption) {}

    public record ReorderRequest(List<Long> orderedIds) {}
}
