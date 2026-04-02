import bcrypt from 'bcryptjs';
import { findAdminByEmail } from './auth.repository';
import { LoginPayload } from './auth.types';
import { signJwt } from '../../config/jwt';

export class AuthError extends Error {
  statusCode = 401;

  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function login(payload: LoginPayload) {
  const identifier = payload.email.trim().toLowerCase();
  const admin = await findAdminByEmail(identifier);

  if (!admin) {
    throw new AuthError('Invalid credentials');
  }

  const matches = await bcrypt.compare(payload.password, admin.password_hash);
  if (!matches) {
    throw new AuthError('Invalid credentials');
  }

  const token = signJwt({ sub: admin.id, email: admin.email });

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email
    }
  };
}
