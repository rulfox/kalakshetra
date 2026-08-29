package com.kalakshetra.backend.controller.admin;

import com.kalakshetra.backend.dto.SiteContentDtos.SiteContentEntry;
import com.kalakshetra.backend.dto.SiteContentDtos.UpdateRequest;
import com.kalakshetra.backend.service.SiteContentService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/site-content")
public class AdminSiteContentController {

    private final SiteContentService siteContentService;

    public AdminSiteContentController(SiteContentService siteContentService) {
        this.siteContentService = siteContentService;
    }

    @GetMapping
    public List<SiteContentEntry> list() {
        return siteContentService.listAll();
    }

    @PutMapping("/{key}")
    public SiteContentEntry update(@PathVariable String key, @Valid @RequestBody UpdateRequest request) {
        return siteContentService.upsert(key, request.value());
    }
}
