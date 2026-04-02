export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
