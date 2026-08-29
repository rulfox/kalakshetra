package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Map;

public class SiteContentDtos {

    public record SiteContentEntry(String key, String value, String label, String group, Instant updatedAt) {}

    /** Public shape: grouped map, e.g. {"hero": {"headline": "...", "subcopy": "..."}, ...}. */
    public record PublicSiteContentResponse(Map<String, Map<String, String>> groups) {}

    public record UpdateRequest(@NotNull String value) {}
}
