package com.ampartechnova.api.product;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private UUID id;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(nullable = false, unique = true, length = 180)
    private String slug;

    @Column(nullable = false, length = 120)
    private String category;

    @Column(nullable = false, length = 800)
    private String summary;

    @Column(nullable = false, length = 500)
    private String materials;

    @Column(nullable = false, length = 800)
    private String applications;

    @Column(name = "publication_status", nullable = false, length = 30)
    private String publicationStatus;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Product() {
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
    public String getCategory() { return category; }
    public String getSummary() { return summary; }
    public String getPublicationStatus() { return publicationStatus; }
    public List<String> getMaterials() { return split(materials); }
    public List<String> getApplications() { return split(applications); }

    private List<String> split(String value) {
        return Arrays.stream(value.split("\\|"))
                .map(String::trim)
                .filter(item -> !item.isBlank())
                .toList();
    }
}
