package com.kalakshetra.backend.service;

import com.kalakshetra.backend.config.S3Properties;
import com.kalakshetra.backend.dto.UploadDtos.PresignRequest;
import com.kalakshetra.backend.dto.UploadDtos.PresignResponse;
import java.time.Duration;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

/**
 * Issues presigned S3 PUT URLs so image bytes go straight from the client to S3 — this backend
 * never proxies the file body. Presigning is a local crypto operation (no network call), so this
 * works even without a real bucket reachable from wherever the backend happens to run.
 */
@Service
public class S3UploadService {

    private static final Logger log = LoggerFactory.getLogger(S3UploadService.class);

    private final S3Presigner s3Presigner;
    private final S3Client s3Client;
    private final S3Properties properties;

    public S3UploadService(S3Presigner s3Presigner, S3Client s3Client, S3Properties properties) {
        this.s3Presigner = s3Presigner;
        this.s3Client = s3Client;
        this.properties = properties;
    }

    public PresignResponse presign(PresignRequest request) {
        String extension = extensionFor(request.fileName());
        String key = "%s/%s%s".formatted(request.kind(), UUID.randomUUID(), extension);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(properties.bucket())
                .key(key)
                .contentType(request.contentType())
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofSeconds(properties.presignExpirySeconds()))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presigned = s3Presigner.presignPutObject(presignRequest);
        String publicUrl = properties.publicBaseUrl().replaceAll("/+$", "") + "/" + key;

        return new PresignResponse(
                presigned.url().toString(), publicUrl, key, properties.presignExpirySeconds());
    }

    /** Best-effort delete — an image left behind in S3 is a non-issue, never worth failing a request over. */
    public void deleteQuietly(String s3Key) {
        try {
            s3Client.deleteObject(DeleteObjectRequest.builder().bucket(properties.bucket()).key(s3Key).build());
        } catch (Exception e) {
            log.warn("Failed to delete S3 object {}: {}", s3Key, e.getMessage());
        }
    }

    private String extensionFor(String fileName) {
        int dot = fileName.lastIndexOf('.');
        return dot >= 0 ? fileName.substring(dot) : "";
    }
}
