package com.ampartechnova.api.product;

import java.util.List;

import com.ampartechnova.api.shared.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final String PUBLISHED = "PUBLISHED";
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<ProductResponse> findAll() {
        return productRepository.findAllByPublicationStatusOrderByCategoryAscNameAsc(PUBLISHED)
                .stream().map(ProductResponse::from).toList();
    }

    @GetMapping("/{slug}")
    public ProductResponse findBySlug(@PathVariable String slug) {
        return productRepository.findBySlugAndPublicationStatus(slug, PUBLISHED)
                .map(ProductResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
}
