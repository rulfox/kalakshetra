package com.kalakshetra.backend.repository;

import com.kalakshetra.backend.domain.SiteContent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteContentRepository extends JpaRepository<SiteContent, Long> {
    List<SiteContent> findAllByOrderByGroupAscKeyAsc();
    Optional<SiteContent> findByKey(String key);
    boolean existsByKey(String key);
}
