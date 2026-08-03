package com.ampartechnova.api.enquiry;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    private UUID id;
    @Column(name = "reference_number", nullable = false, unique = true, length = 40)
    private String referenceNumber;
    @Enumerated(EnumType.STRING)
    @Column(name = "enquiry_type", nullable = false, length = 40)
    private EnquiryType enquiryType;
    @Column(nullable = false, length = 120)
    private String name;
    @Column(nullable = false, length = 180)
    private String company;
    @Column(nullable = false, length = 254)
    private String email;
    @Column(nullable = false, length = 40)
    private String phone;
    @Column(length = 100)
    private String country;
    @Column(name = "product_slug", length = 180)
    private String productSlug;
    @Column(length = 120)
    private String industry;
    @Column(nullable = false, length = 5000)
    private String message;
    @Column(name = "consent_given", nullable = false)
    private boolean consentGiven;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EnquiryStatus status;
    @Column(nullable = false, length = 80)
    private String source;
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Enquiry() {
    }

    Enquiry(UUID id, String referenceNumber, EnquiryRequest request, Instant now) {
        this.id = id;
        this.referenceNumber = referenceNumber;
        this.enquiryType = request.enquiryType();
        this.name = request.name().trim();
        this.company = request.company().trim();
        this.email = request.email().trim().toLowerCase();
        this.phone = request.phone().trim();
        this.country = trimToNull(request.country());
        this.productSlug = trimToNull(request.productSlug());
        this.industry = trimToNull(request.industry());
        this.message = request.message().trim();
        this.consentGiven = request.consentGiven();
        this.status = EnquiryStatus.NEW;
        this.source = "WEBSITE";
        this.createdAt = now;
        this.updatedAt = now;
    }

    public String getReferenceNumber() { return referenceNumber; }
    public EnquiryStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) return null;
        return value.trim();
    }
}
