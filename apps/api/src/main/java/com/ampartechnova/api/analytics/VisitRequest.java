package com.ampartechnova.api.analytics;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
public record VisitRequest(@NotBlank @Size(max=500) @Pattern(regexp="^/.*") String path,
 @Size(max=1000) String referrer, @NotBlank @Size(max=64) String sessionId) {}
