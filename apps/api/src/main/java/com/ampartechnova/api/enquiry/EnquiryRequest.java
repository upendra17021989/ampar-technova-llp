package com.ampartechnova.api.enquiry;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EnquiryRequest(
        @NotNull EnquiryType enquiryType,
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(max = 180) String company,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 40) String phone,
        @Size(max = 100) String country,
        @Size(max = 180) String productSlug,
        @Size(max = 120) String industry,
        @NotBlank @Size(min = 10, max = 5000) String message,
        @AssertTrue(message = "Consent is required") boolean consentGiven) {
}
