package com.ampartechnova.api.product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findAllByPublicationStatusOrderByCategoryAscNameAsc(String publicationStatus);
    Optional<Product> findBySlugAndPublicationStatus(String slug, String publicationStatus);
    boolean existsBySlugAndPublicationStatus(String slug, String publicationStatus);
}
