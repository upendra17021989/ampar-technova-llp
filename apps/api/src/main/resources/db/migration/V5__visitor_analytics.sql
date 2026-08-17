CREATE TABLE page_visits (
    id UUID PRIMARY KEY,
    visitor_hash VARCHAR(64) NOT NULL,
    session_id VARCHAR(64) NOT NULL,
    path VARCHAR(500) NOT NULL,
    referrer VARCHAR(1000),
    user_agent VARCHAR(1000),
    device_type VARCHAR(20) NOT NULL,
    visited_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_visits_visited_at ON page_visits (visited_at DESC);
CREATE INDEX idx_page_visits_visitor_hash ON page_visits (visitor_hash);
CREATE INDEX idx_page_visits_path ON page_visits (path);
