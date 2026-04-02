import crypto from 'node:crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'vimu-dev-jwt-secret';

type JwtPayload = Record<string, unknown> & {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64url(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, 'base64');
}

function parseExpiresIn(expiresIn: string | number) {
  if (typeof expiresIn === 'number') return expiresIn;

  const match = /^([0-9]+)([smhd])$/.exec(expiresIn);
  if (!match) return 8 * 60 * 60;

  const value = Number(match[1]);
  const unit = match[2];
  const multipliers: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };

  return value * multipliers[unit];
}

export function signJwt(payload: { sub: string; email: string }, expiresIn: string | number = '8h') {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + parseExpiresIn(expiresIn);
  const header = { alg: 'HS256', typ: 'JWT' };
  const fullPayload: JwtPayload = { ...payload, iat: now, exp };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));
  const content = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(content).digest();

  return `${content}.${base64url(signature)}`;
}

export function verifyJwt(token: string): JwtPayload {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error('Invalid token');
  }

  const content = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = base64url(crypto.createHmac('sha256', JWT_SECRET).update(content).digest());

  if (expectedSignature !== encodedSignature) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(fromBase64url(encodedPayload).toString('utf8')) as JwtPayload;

  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
}
