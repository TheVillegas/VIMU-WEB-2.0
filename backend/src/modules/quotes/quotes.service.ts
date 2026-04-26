import { createQuoteRecord } from './quotes.repository';
import { QuoteSubmissionInput } from './quotes.types';
import { mapSubmissionToQuote } from './quotes.mapper';
import { sendQuoteNotifications } from './quotes.notifications';

export async function submitQuote(input: QuoteSubmissionInput) {
  const record = mapSubmissionToQuote(input);
  const created = await createQuoteRecord(record);
  void sendQuoteNotifications({
    ...input,
    company_name: created.company_name,
    priority: created.priority,
    budget_amount: created.budget_amount
  }).catch((error) => {
    console.error('[Quotes] Failed to send quote notifications:', error);
  });

  return created;
}
