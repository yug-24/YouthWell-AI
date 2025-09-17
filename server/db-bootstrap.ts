// Database Bootstrap for YouthWell AI - creates tables at runtime
import { pool } from './db';

export async function ensureDatabase() {
  console.log('🔄 Bootstrapping database schema...');

  try {
    // Enable pgcrypto extension for UUID generation
    await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    // Create users table - matching Drizzle schema camelCase columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        uuid uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
        email varchar(255) UNIQUE,
        password varchar(255),
        "isAnonymous" boolean NOT NULL DEFAULT true,
        "displayName" varchar(100),
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        "lastLoginAt" timestamp,
        "isActive" boolean NOT NULL DEFAULT true
      )
    `);

    // Create journals table - matching Drizzle schema camelCase columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS journals (
        id serial PRIMARY KEY,
        "userId" integer NOT NULL REFERENCES users(id),
        title varchar(200),
        content text NOT NULL,
        mood varchar(50),
        "moodScore" integer,
        tags json,
        "isPrivate" boolean NOT NULL DEFAULT true,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create progress table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progress (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users(id),
        goal_type varchar(100) NOT NULL,
        goal_title varchar(200) NOT NULL,
        goal_description text,
        target_value real,
        current_value real NOT NULL DEFAULT 0,
        unit varchar(50),
        status varchar(20) NOT NULL DEFAULT 'active',
        start_date timestamp NOT NULL DEFAULT now(),
        target_date timestamp,
        completed_at timestamp,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create media_files table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS media_files (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users(id),
        filename varchar(255) NOT NULL,
        original_name varchar(255) NOT NULL,
        mime_type varchar(100) NOT NULL,
        file_size integer NOT NULL,
        file_path varchar(500) NOT NULL,
        file_type varchar(20) NOT NULL,
        duration real,
        is_public boolean NOT NULL DEFAULT false,
        related_journal_id integer REFERENCES journals(id),
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create chat_sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users(id),
        session_title varchar(200),
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create chat_messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id serial PRIMARY KEY,
        session_id integer NOT NULL REFERENCES chat_sessions(id),
        role varchar(20) NOT NULL,
        content text NOT NULL,
        metadata json,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);

    // Verify connectivity with a simple query
    const result = await pool.query('SELECT 1 as test');
    if (result.rows[0]?.test === 1) {
      console.log('✅ Database schema bootstrapped successfully');
    } else {
      throw new Error('Database connectivity test failed');
    }

  } catch (error) {
    console.error('❌ Database bootstrap error:', error);
    throw error;
  }
}