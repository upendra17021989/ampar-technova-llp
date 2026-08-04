CREATE TABLE admin_sessions (
    id UUID PRIMARY KEY,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_sessions_username FOREIGN KEY (username) REFERENCES admin_users (username) ON DELETE CASCADE
);

CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions (expires_at);
