package com.ampartechnova.api.product;

import java.util.List;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        String name,
        String slug,
        String category,
        String summary,
        List<String> materials,
        List<String> applications) {

    static ProductResponse from(Product product) {
        return new ProductResponse(product.getId(), product.getName(), product.getSlug(), product.getCategory(),
                product.getSummary(), product.getMaterials(), product.getApplications());
    }
}
