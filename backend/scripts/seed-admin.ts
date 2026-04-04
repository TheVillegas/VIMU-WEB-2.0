import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const required = ['ADMIN_EMAIL', 'ADMIN_PASSWORD'] as const;
const missing = required.filter((key) => !process.env[key]);
const databaseUrl = process.env.DATABASE_URL?.trim();
const legacyVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PASSWORD'] as const;
const missingLegacyVars = legacyVars.filter((key) => !process.env[key]);

if (!databaseUrl && missingLegacyVars.length > 0) {
  missing.push(`DATABASE_URL or ${missingLegacyVars.join(', ')}`);
} else if (!databaseUrl && missingLegacyVars.length === legacyVars.length) {
  missing.push('DATABASE_URL or DB_HOST, DB_USER, DB_NAME, DB_PASSWORD');
}

if (missing.length) {
  throw new Error(`Missing env vars: ${missing.join(', ')}`);
}

async function main() {
  const pool = databaseUrl
    ? new Pool({ connectionString: databaseUrl })
    : new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432', 10)
    });

  const email = process.env.ADMIN_EMAIL!.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, passwordHash]
  );

  await pool.end();
  console.log(`Seeded admin user: ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
