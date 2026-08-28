package com.ampartechnova.api.enquiry;

import java.time.Instant;

public record EnquirySubmittedEvent(
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
        Instant submittedAt) {

    static EnquirySubmittedEvent from(Enquiry enquiry) {
        return new EnquirySubmittedEvent(
                enquiry.getReferenceNumber(), enquiry.getEnquiryType(), enquiry.getName(),
                enquiry.getCompany(), enquiry.getEmail(), enquiry.getPhone(), enquiry.getCountry(),
                enquiry.getProductSlug(), enquiry.getIndustry(), enquiry.getMessage(), enquiry.getCreatedAt());
    }
}
