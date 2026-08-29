package com.kalakshetra.backend.controller.publicapi;

import com.kalakshetra.backend.dto.ItemDtos.ItemResponse;
import com.kalakshetra.backend.exception.ApiExceptions.NotFoundException;
import com.kalakshetra.backend.service.ItemService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/items")
public class PublicItemController {

    private final ItemService itemService;

    public PublicItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<ItemResponse> list(@RequestParam(required = false) String category) {
        return itemService.listAll(category).stream().filter(ItemResponse::published).toList();
    }

    @GetMapping("/{categorySlug}/{itemSlug}")
    public ItemResponse getOne(@PathVariable String categorySlug, @PathVariable String itemSlug) {
        return itemService
                .findByCategoryAndSlug(categorySlug, itemSlug)
                .filter(ItemResponse::published)
                .orElseThrow(() -> new NotFoundException("Item not found: " + categorySlug + "/" + itemSlug));
    }
}
