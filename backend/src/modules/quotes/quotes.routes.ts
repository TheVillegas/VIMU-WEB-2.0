import { Router } from 'express';
import { validateQuoteSubmission, ValidationError } from './quotes.validation';
import { QuoteSubmissionInput } from './quotes.types';

type SubmitQuoteHandler = (payload: QuoteSubmissionInput) => Promise<unknown>;

export function buildQuotesRouter(
  submitQuoteHandler?: SubmitQuoteHandler
) {
  const router = Router();

  router.post('/', async (req, res, next) => {
    try {
      const payload = validateQuoteSubmission(req.body);
      const handler = submitQuoteHandler ?? ((validPayload: QuoteSubmissionInput) =>
        import('./quotes.service').then(({ submitQuote }) => submitQuote(validPayload))
      );
      const created = await handler(payload);

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
