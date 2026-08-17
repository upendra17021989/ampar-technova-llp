package com.ampartechnova.api.analytics;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
interface PageVisitRepository extends JpaRepository<PageVisit,UUID> {
 long countByVisitedAtAfter(Instant since);
 @Query("select count(distinct v.visitorHash) from PageVisit v where v.visitedAt >= :since")
 long countUniqueVisitorsSince(@Param("since") Instant since);
 @Query("select v.path as path, count(v) as visits from PageVisit v where v.visitedAt >= :since group by v.path order by count(v) desc")
 List<PageCount> topPages(@Param("since") Instant since);
 interface PageCount { String getPath(); long getVisits(); }
}
