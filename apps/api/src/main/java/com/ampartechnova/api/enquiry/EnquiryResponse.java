package com.ampartechnova.api.enquiry;

import java.time.Instant;

public record EnquiryResponse(String referenceNumber, EnquiryStatus status, Instant submittedAt) {
    static EnquiryResponse from(Enquiry enquiry) {
        return new EnquiryResponse(enquiry.getReferenceNumber(), enquiry.getStatus(), enquiry.getCreatedAt());
    }
}
