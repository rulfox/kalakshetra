package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class ItemDtos {

    public record ItemResponse(
            Long id,
            String slug,
            String title,
            String themeDescription,
            String categorySlug,
            String categoryName,
            String categoryTone,
            String imageUrl,
            String imageAlt,
            String swatchColor,
            boolean comingSoon,
            boolean published,
            Integer sortOrder,
            Instant updatedAt) {}

    public record ItemRequest(
            @NotBlank String slug,
            @NotBlank String title,
            String themeDescription,
            @NotNull Long categoryId,
            String imageUrl,
            String imageAlt,
            String s3Key,
            String categoryTone,
            String swatchColor,
            boolean comingSoon,
            boolean published) {}

    public record ReorderRequest(Long categoryId, List<Long> orderedIds) {}
}
