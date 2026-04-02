import { Router } from 'express';
import { submitQuote } from './quotes.service';
import { validateQuoteSubmission, ValidationError } from './quotes.validation';

export function buildQuotesRouter(
  submitQuoteHandler = submitQuote
) {
  const router = Router();

  router.post('/', async (req, res, next) => {
    try {
      const payload = validateQuoteSubmission(req.body);
      const created = await submitQuoteHandler(payload);

      res.status(201).json({
        message: 'Quote submitted successfully',
        data: created
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      next(error);
    }
  });

  return router;
}

export default buildQuotesRouter();
