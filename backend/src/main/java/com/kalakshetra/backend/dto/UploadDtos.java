package com.kalakshetra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UploadDtos {

    public record PresignRequest(
            @NotBlank String fileName,
            @NotBlank @Pattern(regexp = "^image/(png|jpeg|jpg|webp|gif)$", message = "contentType must be an image/* type")
                    String contentType,
            @NotBlank @Pattern(regexp = "^(items|categories|lookbook)$") String kind) {}

    public record PresignResponse(String uploadUrl, String publicUrl, String s3Key, long expiresInSeconds) {}
}
