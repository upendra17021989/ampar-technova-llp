package com.ampartechnova.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.test.web.servlet.MvcResult;

import tools.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class AnalyticsApiIntegrationTests {
    @Autowired private MockMvc mockMvc;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private ObjectMapper objectMapper;

    @BeforeEach
    void clearVisits() {
        jdbcTemplate.update("DELETE FROM page_visits");
        jdbcTemplate.update("DELETE FROM admin_sessions");
    }

    @Test
    void recordsAnAnonymousVisitWithoutPersistingTheRawAddress() throws Exception {
        mockMvc.perform(post("/api/analytics/visits")
                        .header("X-Forwarded-For", "203.0.113.10")
                        .header("User-Agent", "Mozilla/5.0 (iPhone; Mobile)")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validVisit("/products")))
                .andExpect(status().isAccepted());

        var visit = jdbcTemplate.queryForMap("SELECT * FROM page_visits");
        assertThat(visit.get("path")).isEqualTo("/products");
        assertThat(visit.get("device_type")).isEqualTo("MOBILE");
        assertThat(visit.get("visitor_hash").toString()).hasSize(64).doesNotContain("203.0.113.10");
    }

    @Test
    void rejectsInvalidVisitPaths() throws Exception {
        mockMvc.perform(post("/api/analytics/visits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validVisit("https://untrusted.example")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"));
    }

    @Test
    void protectsTheSummaryAndReturnsRecordedCountsToAnAdmin() throws Exception {
        mockMvc.perform(post("/api/analytics/visits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validVisit("/about")))
                .andExpect(status().isAccepted());

        mockMvc.perform(get("/api/admin/analytics/summary"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/api/admin/analytics/summary").header("Authorization", bearerToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.visitsToday").value(1))
                .andExpect(jsonPath("$.visitsLast30Days").value(1))
                .andExpect(jsonPath("$.uniqueVisitorsLast30Days").value(1))
                .andExpect(jsonPath("$.topPages[0].path").value("/about"))
                .andExpect(jsonPath("$.topPages[0].visits").value(1));
    }

    private String bearerToken() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/admin/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin\",\"password\":\"test-admin-password\"}"))
                .andExpect(status().isOk()).andReturn();
        return "Bearer " + objectMapper.readTree(result.getResponse().getContentAsString()).get("token").asText();
    }

    private String validVisit(String path) {
        return """
                {"path":"%s","referrer":"https://www.google.com/","sessionId":"f4a60ee0-c3b6-4694-a053-f07bffd42f7f"}
                """.formatted(path);
    }
}
