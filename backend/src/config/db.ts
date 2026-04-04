import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// For local dev where .env is at the root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const databaseUrl = (process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL)?.trim();
const legacyVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PASSWORD'] as const;
const missingLegacyVars = legacyVars.filter((key) => !process.env[key]);

if (!databaseUrl && missingLegacyVars.length === legacyVars.length) {
  throw new Error('Missing database env vars: DATABASE_URL or DB_HOST, DB_USER, DB_NAME, DB_PASSWORD');
}

if (!databaseUrl && missingLegacyVars.length > 0) {
  throw new Error(`Missing database env vars: ${missingLegacyVars.join(', ')}`);
}

const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });

export default pool;
