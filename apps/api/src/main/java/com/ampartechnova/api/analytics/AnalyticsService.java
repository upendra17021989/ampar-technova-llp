package com.ampartechnova.api.analytics;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
class AnalyticsService {
 private final PageVisitRepository repository; private final String hashSalt;
 AnalyticsService(PageVisitRepository repository,@Value("${app.analytics.hash-salt:change-this-analytics-salt}") String salt){this.repository=repository;hashSalt=salt;}
 void record(VisitRequest r,String address,String userAgent){String agent=truncate(userAgent,1000);repository.save(new PageVisit(hash(address),r,agent,deviceType(agent)));}
 AnalyticsSummary summary(){Instant since=Instant.now().minus(30,ChronoUnit.DAYS);Instant today=Instant.now().truncatedTo(ChronoUnit.DAYS);var pages=repository.topPages(since).stream().limit(10).map(p->new AnalyticsSummary.PageStat(p.getPath(),p.getVisits())).toList();return new AnalyticsSummary(repository.countByVisitedAtAfter(since),repository.countUniqueVisitorsSince(since),repository.countByVisitedAtAfter(today),pages);}
 private String hash(String value){try{return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest((hashSalt+":"+value).getBytes(StandardCharsets.UTF_8)));}catch(NoSuchAlgorithmException e){throw new IllegalStateException(e);}}
 private String deviceType(String agent){String a=agent.toLowerCase();if(a.contains("bot")||a.contains("crawler")||a.contains("spider"))return "BOT";if(a.contains("tablet")||a.contains("ipad"))return "TABLET";if(a.contains("mobile")||a.contains("android")||a.contains("iphone"))return "MOBILE";return "DESKTOP";}
 private String truncate(String value,int max){if(value==null)return "";return value.length()<=max?value:value.substring(0,max);}
}
