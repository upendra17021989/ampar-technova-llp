package com.ampartechnova.api.analytics;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class AnalyticsController {
 private final AnalyticsService service;
 public AnalyticsController(AnalyticsService service){this.service=service;}
 @PostMapping("/analytics/visits") public ResponseEntity<Void> record(@Valid @RequestBody VisitRequest visit,HttpServletRequest request){service.record(visit,clientAddress(request),request.getHeader("User-Agent"));return ResponseEntity.accepted().build();}
 @GetMapping("/admin/analytics/summary") public AnalyticsSummary summary(){return service.summary();}
 private String clientAddress(HttpServletRequest request){String forwarded=request.getHeader("X-Forwarded-For");if(forwarded!=null&&!forwarded.isBlank())return forwarded.split(",",2)[0].trim();String real=request.getHeader("X-Real-IP");return real==null||real.isBlank()?request.getRemoteAddr():real.trim();}
}
