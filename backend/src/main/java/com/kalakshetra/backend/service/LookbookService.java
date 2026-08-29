package com.kalakshetra.backend.service;

import com.kalakshetra.backend.domain.LookbookSlide;
import com.kalakshetra.backend.dto.LookbookDtos.LookbookSlideRequest;
import com.kalakshetra.backend.dto.LookbookDtos.LookbookSlideResponse;
import com.kalakshetra.backend.exception.ApiExceptions.NotFoundException;
import com.kalakshetra.backend.repository.LookbookSlideRepository;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LookbookService {

    private final LookbookSlideRepository repository;
    private final S3UploadService s3UploadService;
    private final RevalidationService revalidationService;

    public LookbookService(
            LookbookSlideRepository repository, S3UploadService s3UploadService, RevalidationService revalidationService) {
        this.repository = repository;
        this.s3UploadService = s3UploadService;
        this.revalidationService = revalidationService;
    }

    @Transactional(readOnly = true)
    public List<LookbookSlideResponse> listAll() {
        return repository.findAllByOrderBySortOrderAsc().stream().map(this::toResponse).toList();
    }

    @Transactional
    public LookbookSlideResponse create(LookbookSlideRequest request) {
        LookbookSlide slide = LookbookSlide.builder()
                .imageUrl(request.imageUrl())
                .imageAlt(request.imageAlt())
                .s3Key(request.s3Key())
                .eyebrow(request.eyebrow())
                .caption(request.caption())
                .sortOrder(repository.findAllByOrderBySortOrderAsc().size())
                .build();
        LookbookSlide saved = repository.save(slide);
        revalidationService.notifyChanged("lookbook");
        return toResponse(saved);
    }

    @Transactional
    public LookbookSlideResponse update(Long id, LookbookSlideRequest request) {
        LookbookSlide slide = findOrThrow(id);
        String oldS3Key = slide.getS3Key();
        slide.setImageUrl(request.imageUrl());
        slide.setImageAlt(request.imageAlt());
        slide.setS3Key(request.s3Key());
        slide.setEyebrow(request.eyebrow());
        slide.setCaption(request.caption());
        LookbookSlide saved = repository.save(slide);
        if (oldS3Key != null && !oldS3Key.equals(request.s3Key())) {
            s3UploadService.deleteQuietly(oldS3Key);
        }
        revalidationService.notifyChanged("lookbook");
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        LookbookSlide slide = findOrThrow(id);
        repository.delete(slide);
        if (slide.getS3Key() != null) {
            s3UploadService.deleteQuietly(slide.getS3Key());
        }
        revalidationService.notifyChanged("lookbook");
    }

    @Transactional
    public void reorder(List<Long> orderedIds) {
        Map<Long, LookbookSlide> byId =
                repository.findAllById(orderedIds).stream().collect(Collectors.toMap(LookbookSlide::getId, s -> s));
        for (int i = 0; i < orderedIds.size(); i++) {
            LookbookSlide slide = byId.get(orderedIds.get(i));
            if (slide != null) {
                slide.setSortOrder(i);
            }
        }
        repository.saveAll(byId.values());
        revalidationService.notifyChanged("lookbook");
    }

    private LookbookSlide findOrThrow(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Lookbook slide not found: " + id));
    }

    private LookbookSlideResponse toResponse(LookbookSlide s) {
        return new LookbookSlideResponse(
                s.getId(), s.getImageUrl(), s.getImageAlt(), s.getEyebrow(), s.getCaption(), s.getSortOrder(), s.getUpdatedAt());
    }
}
