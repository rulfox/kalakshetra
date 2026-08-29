package com.kalakshetra.backend.service;

import com.kalakshetra.backend.domain.Category;
import com.kalakshetra.backend.dto.CategoryDtos.CategoryRequest;
import com.kalakshetra.backend.dto.CategoryDtos.CategoryResponse;
import com.kalakshetra.backend.exception.ApiExceptions.ConflictException;
import com.kalakshetra.backend.exception.ApiExceptions.NotFoundException;
import com.kalakshetra.backend.repository.CategoryRepository;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final RevalidationService revalidationService;

    public CategoryService(CategoryRepository categoryRepository, RevalidationService revalidationService) {
        this.categoryRepository = categoryRepository;
        this.revalidationService = revalidationService;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listAll() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream().map(this::toResponse).toList();
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        if (categoryRepository.existsBySlug(request.slug())) {
            throw new ConflictException("A category with slug '" + request.slug() + "' already exists");
        }
        Category category = Category.builder()
                .slug(request.slug())
                .name(request.name())
                .sortOrder(nextSortOrder())
                .build();
        Category saved = categoryRepository.save(category);
        revalidationService.notifyChanged("categories");
        return toResponse(saved);
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = findOrThrow(id);
        categoryRepository.findBySlug(request.slug()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ConflictException("A category with slug '" + request.slug() + "' already exists");
            }
        });
        category.setSlug(request.slug());
        category.setName(request.name());
        Category saved = categoryRepository.save(category);
        revalidationService.notifyChanged("categories");
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Category category = findOrThrow(id);
        categoryRepository.delete(category);
        revalidationService.notifyChanged("categories");
    }

    @Transactional
    public void reorder(List<Long> orderedIds) {
        Map<Long, Category> bySortId = categoryRepository.findAllById(orderedIds).stream()
                .collect(java.util.stream.Collectors.toMap(Category::getId, c -> c));
        for (int i = 0; i < orderedIds.size(); i++) {
            Category category = bySortId.get(orderedIds.get(i));
            if (category != null) {
                category.setSortOrder(i);
            }
        }
        categoryRepository.saveAll(bySortId.values());
        revalidationService.notifyChanged("categories");
    }

    private int nextSortOrder() {
        return categoryRepository.findAllByOrderBySortOrderAsc().size();
    }

    private Category findOrThrow(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category not found: " + id));
    }

    private CategoryResponse toResponse(Category c) {
        return new CategoryResponse(c.getId(), c.getSlug(), c.getName(), c.getSortOrder(), c.getUpdatedAt());
    }
}
