package com.ampartechnova.api.enquiry;

import java.net.URI;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<EnquiryResponse> submit(@Valid @RequestBody EnquiryRequest request) {
        EnquiryResponse response = enquiryService.submit(request);
        return ResponseEntity.created(URI.create("/api/enquiries/" + response.referenceNumber())).body(response);
    }
}
