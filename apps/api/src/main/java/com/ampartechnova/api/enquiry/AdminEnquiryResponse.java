package com.ampartechnova.api.enquiry;

import java.time.Instant;
import java.util.UUID;

public record AdminEnquiryResponse(
        UUID id,
        String referenceNumber,
        EnquiryType enquiryType,
        String name,
        String company,
        String email,
        String phone,
        String country,
        String productSlug,
        String industry,
        String message,
        EnquiryStatus status,
        Instant createdAt,
        Instant updatedAt) {

    static AdminEnquiryResponse from(Enquiry enquiry) {
        return new AdminEnquiryResponse(
                enquiry.getId(), enquiry.getReferenceNumber(), enquiry.getEnquiryType(),
                enquiry.getName(), enquiry.getCompany(), enquiry.getEmail(), enquiry.getPhone(),
                enquiry.getCountry(), enquiry.getProductSlug(), enquiry.getIndustry(), enquiry.getMessage(),
                enquiry.getStatus(), enquiry.getCreatedAt(), enquiry.getUpdatedAt());
    }
}
