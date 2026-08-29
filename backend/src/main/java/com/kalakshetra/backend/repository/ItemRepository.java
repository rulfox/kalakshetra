package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.Item;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByOrderBySortOrderAsc();
    List<Item> findAllByCategorySlugOrderBySortOrderAsc(String categorySlug);
    List<Item> findAllByCategoryIdOrderBySortOrderAsc(Long categoryId);
    Optional<Item> findByCategorySlugAndSlug(String categorySlug, String slug);
    boolean existsBySlug(String slug);
}
