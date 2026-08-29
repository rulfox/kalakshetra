package com.kalakshetra.backend.controller.publicapi;

import com.kalakshetra.backend.dto.SiteContentDtos.PublicSiteContentResponse;
import com.kalakshetra.backend.service.SiteContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/site-content")
public class PublicSiteContentController {

    private final SiteContentService siteContentService;

    public PublicSiteContentController(SiteContentService siteContentService) {
        this.siteContentService = siteContentService;
    }

    @GetMapping
    public PublicSiteContentResponse get() {
        return siteContentService.publicGrouped();
    }
}
