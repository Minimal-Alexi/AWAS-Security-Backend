import { newDb } from 'pg-mem';

export function createTestDb() {
  const db = newDb();

  db.public.none(`
-- USERS TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    valuation INTEGER DEFAULT 0,
    admin BOOLEAN DEFAULT FALSE
);

-- SUPPORT CHAT TABLE
CREATE TABLE support_chat (
    support_chat_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    
    CONSTRAINT fk_support_chat_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- MESSAGE TABLE
CREATE TABLE message (
    message_id SERIAL PRIMARY KEY,
    support_chat_id INTEGER NOT NULL,
    order_nr INTEGER,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_message_chat
        FOREIGN KEY (support_chat_id)
        REFERENCES support_chat(support_chat_id)
        ON DELETE CASCADE
);
  `);

  // Create pg-compatible client
  const pg = db.adapters.createPg();

  return {
    db,
    pool: new pg.Pool(),
  };
}