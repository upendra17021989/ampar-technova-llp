package com.ampartechnova.api;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class PublicApiIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void seedProduct() {
        jdbcTemplate.update("DELETE FROM enquiries");
        jdbcTemplate.update("DELETE FROM products");
        jdbcTemplate.update("""
                INSERT INTO products
                    (id, name, slug, category, summary, materials, applications,
                     publication_status, created_at, updated_at)
                VALUES
                    (RANDOM_UUID(), 'FRP Storage Tanks', 'frp-storage-tanks', 'Storage Equipment',
                     'Custom-engineered FRP storage tanks.', 'FRP', 'Chemical storage|Process utilities',
                     'PUBLISHED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """);
    }

    @Test
    void listsPublishedProductsWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].slug").value("frp-storage-tanks"))
                .andExpect(jsonPath("$[0].materials[0]").value("FRP"));
    }

    @Test
    void returnsNotFoundForUnknownProduct() throws Exception {
        mockMvc.perform(get("/api/products/not-a-product"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }

    @Test
    void storesAValidEnquiryAndReturnsAReference() throws Exception {
        mockMvc.perform(post("/api/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validEnquiry("frp-storage-tanks", true)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", matchesPattern("/api/enquiries/AMP-\\d{8}-[A-F0-9]{8}")))
                .andExpect(jsonPath("$.referenceNumber", matchesPattern("AMP-\\d{8}-[A-F0-9]{8}")))
                .andExpect(jsonPath("$.status").value("NEW"));
    }

    @Test
    void rejectsMissingConsentWithFieldError() throws Exception {
        mockMvc.perform(post("/api/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validEnquiry("frp-storage-tanks", false)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
                .andExpect(jsonPath("$.fieldErrors.consentGiven").value("Consent is required"));
    }

    @Test
    void rejectsAnUnknownProduct() throws Exception {
        mockMvc.perform(post("/api/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validEnquiry("unknown-product", true)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_REQUEST"));
    }

    private String validEnquiry(String productSlug, boolean consentGiven) {
        return """
                {
                  "enquiryType": "QUOTE",
                  "name": "Example User",
                  "company": "Example Industries",
                  "email": "user@example.com",
                  "phone": "+91 99999 99999",
                  "country": "India",
                  "productSlug": "%s",
                  "industry": "Chemical Processing",
                  "message": "Please review this FRP storage tank requirement.",
                  "consentGiven": %s
                }
                """.formatted(productSlug, consentGiven);
    }
}
