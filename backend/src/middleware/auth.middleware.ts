import { Request, RequestHandler } from 'express';
import { verifyJwt } from '../config/jwt';
import { JWTPayload } from '../modules/auth/auth.types';

export interface AuthenticatedRequest extends Request {
  admin?: JWTPayload;
}

export const verifyJWT: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    (req as AuthenticatedRequest).admin = verifyJwt(token);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
