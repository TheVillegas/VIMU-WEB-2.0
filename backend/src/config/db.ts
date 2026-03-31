import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// For local dev where .env is at the root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;
