import { Router } from 'express';
import { verifyJWT } from '../../middleware/auth.middleware';
import { QuoteStatus } from '../quotes/quotes.types';
import { getQuoteById, getQuoteStats, listQuotes, updateQuoteStatus } from './admin.repository';

const allowedStatuses = new Set<QuoteStatus>(['nuevo', 'visto', 'respondido', 'cerrado']);

export function buildAdminRouter() {
  const router = Router();

  router.use(verifyJWT);

  router.get('/stats', async (_req, res, next) => {
    try {
      const stats = await getQuoteStats();
      res.json({ data: stats });
    } catch (error) {
      next(error);
    }
  });

  router.get('/quotes', async (req, res, next) => {
    try {
      const status = typeof req.query.status === 'string' && allowedStatuses.has(req.query.status as QuoteStatus)
        ? (req.query.status as QuoteStatus)
        : undefined;
      const from = typeof req.query.from === 'string' ? req.query.from : undefined;
      const to = typeof req.query.to === 'string' ? req.query.to : undefined;

      const quotes = await listQuotes({ status, from, to });
      res.json({ data: quotes });
    } catch (error) {
      next(error);
    }
  });

  router.get('/quotes/:id', async (req, res, next) => {
    try {
      const quote = await getQuoteById(req.params.id);

      if (!quote) {
        res.status(404).json({ message: 'Quote not found' });
        return;
      }

      res.json({ data: quote });
    } catch (error) {
      next(error);
    }
  });

  router.patch('/quotes/:id/status', async (req, res, next) => {
    try {
      const status = req.body?.status;

      if (!allowedStatuses.has(status)) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      const updated = await updateQuoteStatus(req.params.id, status);

      if (!updated) {
        res.status(404).json({ message: 'Quote not found' });
        return;
      }

      res.json({ data: updated });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export default buildAdminRouter();
