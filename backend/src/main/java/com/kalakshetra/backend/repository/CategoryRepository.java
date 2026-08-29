package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderBySortOrderAsc();
    Optional<Category> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
