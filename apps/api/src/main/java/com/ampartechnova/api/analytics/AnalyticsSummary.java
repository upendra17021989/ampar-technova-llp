package com.ampartechnova.api.analytics;
import java.util.List;
public record AnalyticsSummary(long visitsLast30Days,long uniqueVisitorsLast30Days,long visitsToday,List<PageStat> topPages) {
 public record PageStat(String path,long visits) {}
}
