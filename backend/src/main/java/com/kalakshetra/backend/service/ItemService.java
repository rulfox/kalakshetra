package com.kalakshetra.backend.service;

import com.kalakshetra.backend.domain.Category;
import com.kalakshetra.backend.domain.Item;
import com.kalakshetra.backend.dto.ItemDtos.ItemRequest;
import com.kalakshetra.backend.dto.ItemDtos.ItemResponse;
import com.kalakshetra.backend.exception.ApiExceptions.ConflictException;
import com.kalakshetra.backend.exception.ApiExceptions.NotFoundException;
import com.kalakshetra.backend.repository.CategoryRepository;
import com.kalakshetra.backend.repository.ItemRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final S3UploadService s3UploadService;
    private final RevalidationService revalidationService;

    public ItemService(
            ItemRepository itemRepository,
            CategoryRepository categoryRepository,
            S3UploadService s3UploadService,
            RevalidationService revalidationService) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.s3UploadService = s3UploadService;
        this.revalidationService = revalidationService;
    }

    @Transactional(readOnly = true)
    public List<ItemResponse> listAll(String categorySlug) {
        List<Item> items = categorySlug == null || categorySlug.isBlank()
                ? itemRepository.findAllByOrderBySortOrderAsc()
                : itemRepository.findAllByCategorySlugOrderBySortOrderAsc(categorySlug);
        return items.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public Optional<ItemResponse> findByCategoryAndSlug(String categorySlug, String itemSlug) {
        return itemRepository.findByCategorySlugAndSlug(categorySlug, itemSlug).map(this::toResponse);
    }

    @Transactional
    public ItemResponse create(ItemRequest request) {
        if (itemRepository.existsBySlug(request.slug())) {
            throw new ConflictException("An item with slug '" + request.slug() + "' already exists");
        }
        Category category = findCategoryOrThrow(request.categoryId());
        Item item = Item.builder()
                .slug(request.slug())
                .title(request.title())
                .themeDescription(request.themeDescription())
                .category(category)
                .imageUrl(request.imageUrl())
                .imageAlt(request.imageAlt())
                .s3Key(request.s3Key())
                .categoryTone(request.categoryTone())
                .swatchColor(request.swatchColor())
                .comingSoon(request.comingSoon())
                .published(request.published())
                .sortOrder(itemRepository.findAllByCategoryIdOrderBySortOrderAsc(category.getId()).size())
                .build();
        Item saved = itemRepository.save(item);
        revalidationService.notifyChanged("items");
        return toResponse(saved);
    }

    @Transactional
    public ItemResponse update(Long id, ItemRequest request) {
        Item item = findOrThrow(id);
        if (!item.getSlug().equals(request.slug()) && itemRepository.existsBySlug(request.slug())) {
            throw new ConflictException("An item with slug '" + request.slug() + "' already exists");
        }
        Category category = findCategoryOrThrow(request.categoryId());
        String oldS3Key = item.getS3Key();
        String newS3Key = request.s3Key();

        item.setSlug(request.slug());
        item.setTitle(request.title());
        item.setThemeDescription(request.themeDescription());
        item.setCategory(category);
        item.setImageUrl(request.imageUrl());
        item.setImageAlt(request.imageAlt());
        item.setS3Key(newS3Key);
        item.setCategoryTone(request.categoryTone());
        item.setSwatchColor(request.swatchColor());
        item.setComingSoon(request.comingSoon());
        item.setPublished(request.published());
        Item saved = itemRepository.save(item);

        if (oldS3Key != null && !oldS3Key.equals(newS3Key)) {
            s3UploadService.deleteQuietly(oldS3Key);
        }
        revalidationService.notifyChanged("items");
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Item item = findOrThrow(id);
        itemRepository.delete(item);
        if (item.getS3Key() != null) {
            s3UploadService.deleteQuietly(item.getS3Key());
        }
        revalidationService.notifyChanged("items");
    }

    @Transactional
    public void reorder(Long categoryId, List<Long> orderedIds) {
        Map<Long, Item> byId = itemRepository.findAllById(orderedIds).stream()
                .collect(Collectors.toMap(Item::getId, i -> i));
        for (int i = 0; i < orderedIds.size(); i++) {
            Item item = byId.get(orderedIds.get(i));
            if (item != null && item.getCategory().getId().equals(categoryId)) {
                item.setSortOrder(i);
            }
        }
        itemRepository.saveAll(byId.values());
        revalidationService.notifyChanged("items");
    }

    private Category findCategoryOrThrow(Long categoryId) {
        return categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found: " + categoryId));
    }

    private Item findOrThrow(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new NotFoundException("Item not found: " + id));
    }

    private ItemResponse toResponse(Item i) {
        return new ItemResponse(
                i.getId(),
                i.getSlug(),
                i.getTitle(),
                i.getThemeDescription(),
                i.getCategory().getSlug(),
                i.getCategory().getName(),
                i.getCategoryTone(),
                i.getImageUrl(),
                i.getImageAlt(),
                i.getSwatchColor(),
                i.isComingSoon(),
                i.isPublished(),
                i.getSortOrder(),
                i.getUpdatedAt());
    }
}
