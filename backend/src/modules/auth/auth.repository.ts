import pool from '../../config/db';
import { AdminUser } from './auth.types';

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const { rows } = await pool.query<AdminUser>(
    'SELECT id, email, password_hash, created_at FROM admin_users WHERE email = $1 LIMIT 1',
    [email]
  );

  return rows[0] ?? null;
}
