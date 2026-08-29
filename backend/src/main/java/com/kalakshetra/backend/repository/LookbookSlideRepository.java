package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.LookbookSlide;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LookbookSlideRepository extends JpaRepository<LookbookSlide, Long> {
    List<LookbookSlide> findAllByOrderBySortOrderAsc();
}
