package com.ampartechnova.api.enquiry;

import jakarta.validation.constraints.NotNull;

public record EnquiryStatusRequest(@NotNull(message = "Status is required") EnquiryStatus status) {
}
