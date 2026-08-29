package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.List;

public class CategoryDtos {

    public record CategoryResponse(
            Long id,
            String slug,
            String name,
            Integer sortOrder,
            Instant updatedAt) {}

    public record CategoryRequest(@NotBlank String slug, @NotBlank String name) {}

    public record ReorderRequest(List<Long> orderedIds) {}
}
