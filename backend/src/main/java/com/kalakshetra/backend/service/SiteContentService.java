package com.kalakshetra.backend.service;

import com.kalakshetra.backend.domain.SiteContent;
import com.kalakshetra.backend.dto.SiteContentDtos.PublicSiteContentResponse;
import com.kalakshetra.backend.dto.SiteContentDtos.SiteContentEntry;
import com.kalakshetra.backend.repository.SiteContentRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SiteContentService {

    private final SiteContentRepository repository;
    private final RevalidationService revalidationService;

    public SiteContentService(SiteContentRepository repository, RevalidationService revalidationService) {
        this.repository = repository;
        this.revalidationService = revalidationService;
    }

    @Transactional(readOnly = true)
    public List<SiteContentEntry> listAll() {
        return repository.findAllByOrderByGroupAscKeyAsc().stream()
                .map(sc -> new SiteContentEntry(sc.getKey(), sc.getValue(), sc.getLabel(), sc.getGroup(), sc.getUpdatedAt()))
                .toList();
    }

    @Transactional(readOnly = true)
    public PublicSiteContentResponse publicGrouped() {
        Map<String, SiteContent> byKey = new LinkedHashMap<>();
        repository.findAll().forEach(sc -> byKey.put(sc.getKey(), sc));

        Map<String, Map<String, String>> groups = new LinkedHashMap<>();
        for (SiteContentKeys.Def def : SiteContentKeys.ALL) {
            String fieldName = def.key().substring(def.key().indexOf('.') + 1);
            String value = byKey.containsKey(def.key()) ? byKey.get(def.key()).getValue() : def.defaultValue();
            groups.computeIfAbsent(def.group(), g -> new LinkedHashMap<>()).put(fieldName, value);
        }
        return new PublicSiteContentResponse(groups);
    }

    @Transactional
    public SiteContentEntry upsert(String key, String value) {
        SiteContentKeys.Def def = SiteContentKeys.find(key);
        SiteContent entity = repository
                .findByKey(key)
                .orElseGet(() -> SiteContent.builder().key(key).label(def.label()).group(def.group()).build());
        entity.setValue(value);
        entity.setLabel(def.label());
        entity.setGroup(def.group());
        SiteContent saved = repository.save(entity);
        revalidationService.notifyChanged("site-content");
        return new SiteContentEntry(saved.getKey(), saved.getValue(), saved.getLabel(), saved.getGroup(), saved.getUpdatedAt());
    }
}
