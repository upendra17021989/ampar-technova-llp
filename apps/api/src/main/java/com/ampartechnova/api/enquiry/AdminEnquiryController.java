package com.ampartechnova.api.enquiry;

import java.util.UUID;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/enquiries")
public class AdminEnquiryController {
    private final AdminEnquiryService service;

    public AdminEnquiryController(AdminEnquiryService service) {
        this.service = service;
    }

    @GetMapping
    Page<AdminEnquiryResponse> list(
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        int safeSize = Math.min(Math.max(size, 1), 100);
        return service.list(status, Math.max(page, 0), safeSize);
    }

    @GetMapping("/{id}")
    AdminEnquiryResponse get(@PathVariable UUID id) {
        return service.get(id);
    }

    @PatchMapping("/{id}/status")
    ResponseEntity<AdminEnquiryResponse> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody EnquiryStatusRequest request) {
        return ResponseEntity.ok(service.updateStatus(id, request));
    }
}
