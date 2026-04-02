import { Router } from 'express';
import { AuthError, login } from './auth.service';
import { authLoginRateLimit } from '../../middleware/rate-limit.middleware';

export function buildAuthRouter(loginHandler = login) {
  const router = Router();

  router.post('/login', authLoginRateLimit, async (req, res, next) => {
    try {
      const { email, password } = req.body ?? {};
      const result = await loginHandler({ email, password });

      res.status(200).json({
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      next(error);
    }
  });

  return router;
}

export default buildAuthRouter();
