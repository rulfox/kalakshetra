package com.kalakshetra.backend.controller.admin;

import com.kalakshetra.backend.dto.ItemDtos.ItemRequest;
import com.kalakshetra.backend.dto.ItemDtos.ItemResponse;
import com.kalakshetra.backend.dto.ItemDtos.ReorderRequest;
import com.kalakshetra.backend.service.ItemService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/items")
public class AdminItemController {

    private final ItemService itemService;

    public AdminItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<ItemResponse> list(@RequestParam(required = false) String category) {
        return itemService.listAll(category);
    }

    @PostMapping
    public ItemResponse create(@Valid @RequestBody ItemRequest request) {
        return itemService.create(request);
    }

    @PutMapping("/{id}")
    public ItemResponse update(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return itemService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/reorder")
    public ResponseEntity<Void> reorder(@RequestBody ReorderRequest request) {
        itemService.reorder(request.categoryId(), request.orderedIds());
        return ResponseEntity.noContent().build();
    }
}
