import { QuoteRecord, QuoteSubmissionInput, Priority, BudgetTier, Timeline, QuoteStatus } from './quotes.types';

const budgetMap: Record<QuoteSubmissionInput['budget_tier'], { amount: number | null; priority: Priority }> = {
  [BudgetTier.BAJO]: { amount: 500000, priority: Priority.NORMAL },
  [BudgetTier.MEDIO]: { amount: 2000000, priority: Priority.NORMAL },
  [BudgetTier.ALTO]: { amount: 5000000, priority: Priority.URGENT },
  [BudgetTier.A_CONSULTAR]: { amount: null, priority: Priority.URGENT }
};

const timelineMap: Record<QuoteSubmissionInput['timeline'], string> = {
  [Timeline.URGENTE]: 'Short',
  [Timeline.CORTO]: 'Short',
  [Timeline.MEDIO]: 'Medium',
  [Timeline.LARGO]: 'Long',
  [Timeline.FLEXIBLE]: 'Flexible'
};

export function mapSubmissionToQuote(input: QuoteSubmissionInput): Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'> {
  const budget = budgetMap[input.budget_tier];

  return {
    company_name: input.company?.trim() || input.name.trim(),
    email: input.email.trim().toLowerCase(),
    whatsapp: input.phone?.trim() || null,
    project_type: input.project_type,
    timeline: input.timeline,
    budget_tier: input.budget_tier,
    budget_amount: budget.amount,
    priority: budget.priority,
    expected_metrics: null,
    business_needs: `${timelineMap[input.timeline]} | ${input.description.trim()}`,
    status: QuoteStatus.NUEVO,
    notes: null
  };
}
