package com.kalakshetra.backend.controller.admin;

import com.kalakshetra.backend.dto.LookbookDtos.LookbookSlideRequest;
import com.kalakshetra.backend.dto.LookbookDtos.LookbookSlideResponse;
import com.kalakshetra.backend.dto.LookbookDtos.ReorderRequest;
import com.kalakshetra.backend.service.LookbookService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/lookbook")
public class AdminLookbookController {

    private final LookbookService lookbookService;

    public AdminLookbookController(LookbookService lookbookService) {
        this.lookbookService = lookbookService;
    }

    @GetMapping
    public List<LookbookSlideResponse> list() {
        return lookbookService.listAll();
    }

    @PostMapping
    public LookbookSlideResponse create(@RequestBody LookbookSlideRequest request) {
        return lookbookService.create(request);
    }

    @PutMapping("/{id}")
    public LookbookSlideResponse update(@PathVariable Long id, @RequestBody LookbookSlideRequest request) {
        return lookbookService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        lookbookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/reorder")
    public ResponseEntity<Void> reorder(@RequestBody ReorderRequest request) {
        lookbookService.reorder(request.orderedIds());
        return ResponseEntity.noContent().build();
    }
}
