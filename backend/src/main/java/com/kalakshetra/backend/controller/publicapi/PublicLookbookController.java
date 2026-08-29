package com.kalakshetra.backend.controller.publicapi;

import com.kalakshetra.backend.dto.LookbookDtos.LookbookSlideResponse;
import com.kalakshetra.backend.service.LookbookService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/lookbook")
public class PublicLookbookController {

    private final LookbookService lookbookService;

    public PublicLookbookController(LookbookService lookbookService) {
        this.lookbookService = lookbookService;
    }

    @GetMapping
    public List<LookbookSlideResponse> list() {
        return lookbookService.listAll();
    }
}
