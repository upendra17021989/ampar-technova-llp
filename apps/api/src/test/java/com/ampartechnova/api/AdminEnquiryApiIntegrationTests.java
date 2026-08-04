package com.ampartechnova.api;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

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
class AdminEnquiryApiIntegrationTests {
    @Autowired private MockMvc mockMvc;
    @Autowired private JdbcTemplate jdbcTemplate;
    private UUID enquiryId;

    @BeforeEach
    void seedEnquiry() {
        jdbcTemplate.update("DELETE FROM enquiries");
        jdbcTemplate.update("DELETE FROM products");
        enquiryId = UUID.randomUUID();
        jdbcTemplate.update("""
                INSERT INTO enquiries
                    (id, reference_number, enquiry_type, name, company, email, phone, message,
                     consent_given, status, source, created_at, updated_at)
                VALUES (?, 'AMP-20260803-ABCDEF12', 'QUOTE', 'Example User', 'Example Industries',
                        'user@example.com', '+91 99999 99999', 'Please review this requirement.',
                        TRUE, 'NEW', 'WEBSITE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """, enquiryId);
    }

    @Test
    void rejectsAnonymousAdminRequests() throws Exception {
        mockMvc.perform(get("/api/admin/enquiries")).andExpect(status().isUnauthorized());
    }

    @Test
    void rejectsIncorrectPersistentAdminPassword() throws Exception {
        mockMvc.perform(get("/api/admin/enquiries")
                        .with(httpBasic("admin", "incorrect-password")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void storesTheBootstrapPasswordAsAnEncodedHash() {
        String passwordHash = jdbcTemplate.queryForObject(
                "SELECT password_hash FROM admin_users WHERE username = 'admin'", String.class);
        org.assertj.core.api.Assertions.assertThat(passwordHash)
                .isNotEqualTo("test-admin-password")
                .startsWith("{");
    }

    @Test
    void listsEnquiriesForAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/enquiries?status=NEW")
                        .with(httpBasic("admin", "test-admin-password")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].referenceNumber").value("AMP-20260803-ABCDEF12"))
                .andExpect(jsonPath("$.content[0].email").value("user@example.com"));
    }

    @Test
    void updatesEnquiryStatusForAdmin() throws Exception {
        mockMvc.perform(patch("/api/admin/enquiries/{id}/status", enquiryId)
                        .with(httpBasic("admin", "test-admin-password"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"CONTACTED\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONTACTED"));
    }
}
