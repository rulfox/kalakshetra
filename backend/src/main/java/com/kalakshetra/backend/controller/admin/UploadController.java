package com.kalakshetra.backend.controller.admin;

import com.kalakshetra.backend.dto.UploadDtos.PresignRequest;
import com.kalakshetra.backend.dto.UploadDtos.PresignResponse;
import com.kalakshetra.backend.service.S3UploadService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/uploads")
public class UploadController {

    private final S3UploadService s3UploadService;

    public UploadController(S3UploadService s3UploadService) {
        this.s3UploadService = s3UploadService;
    }

    @PostMapping("/presign")
    public PresignResponse presign(@Valid @RequestBody PresignRequest request) {
        return s3UploadService.presign(request);
    }
}
