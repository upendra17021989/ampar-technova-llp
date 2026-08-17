package com.ampartechnova.api.analytics;
import java.time.Instant;
import java.util.UUID;
import jakarta.persistence.*;
@Entity @Table(name="page_visits")
class PageVisit {
 @Id private UUID id;
 @Column(name="visitor_hash",nullable=false,length=64) private String visitorHash;
 @Column(name="session_id",nullable=false,length=64) private String sessionId;
 @Column(nullable=false,length=500) private String path;
 @Column(length=1000) private String referrer;
 @Column(name="user_agent",length=1000) private String userAgent;
 @Column(name="device_type",nullable=false,length=20) private String deviceType;
 @Column(name="visited_at",nullable=false) private Instant visitedAt;
 protected PageVisit() {}
 PageVisit(String hash, VisitRequest r, String agent, String device) {
  id=UUID.randomUUID(); visitorHash=hash; sessionId=r.sessionId(); path=r.path();
  referrer=r.referrer()==null||r.referrer().isBlank()?null:r.referrer(); userAgent=agent;
  deviceType=device; visitedAt=Instant.now();
 }
}
