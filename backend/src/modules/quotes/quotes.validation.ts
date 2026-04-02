import { BudgetTier, ProjectType, QuoteSubmissionInput, Timeline } from './quotes.types';

export class ValidationError extends Error {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const projectTypes = new Set<ProjectType>([
  'consultoria',
  'full_stack',
  'modernizacion',
  'cloud_serverless',
  'ia_agentes'
]);

const timelines = new Set<Timeline>(['urgente', 'corto', 'medio', 'largo', 'flexible']);
const budgets = new Set<BudgetTier>(['bajo', 'medio', 'alto', 'a_consultar']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, field: string, minLength = 1): string {
  if (typeof value !== 'string' || value.trim().length < minLength) {
    throw new ValidationError(`Invalid or missing field: ${field}`);
  }

  return value.trim();
}

export function validateQuoteSubmission(input: unknown): QuoteSubmissionInput {
  if (!isRecord(input)) {
    throw new ValidationError('Request body must be an object');
  }

  const name = requireString(input.name, 'name', 2);
  const email = requireString(input.email, 'email', 5);
  const description = requireString(input.description, 'description', 20);
  const project_type = requireString(input.project_type, 'project_type') as ProjectType;
  const timeline = requireString(input.timeline, 'timeline') as Timeline;
  const budget_tier = requireString(input.budget_tier, 'budget_tier') as BudgetTier;

  if (!projectTypes.has(project_type)) throw new ValidationError('Invalid project_type');
  if (!timelines.has(timeline)) throw new ValidationError('Invalid timeline');
  if (!budgets.has(budget_tier)) throw new ValidationError('Invalid budget_tier');

  const phone = typeof input.phone === 'string' && input.phone.trim() ? input.phone.trim() : undefined;
  const company = typeof input.company === 'string' && input.company.trim() ? input.company.trim() : undefined;

  return {
    name,
    email,
    phone,
    company,
    project_type,
    timeline,
    budget_tier,
    description
  };
}
