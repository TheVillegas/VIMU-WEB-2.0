import { describe, expect, it } from 'vitest';
import { validateQuoteSubmission } from './quotes.validation';

describe('validateQuoteSubmission', () => {
  it('accepts a valid submission payload', () => {
    const result = validateQuoteSubmission({
      name: 'Matías',
      email: 'matias@example.com',
      phone: '+56912345678',
      company: 'VIMU DEVS',
      project_type: 'consultoria',
      timeline: 'corto',
      budget_tier: 'medio',
      description: 'Necesitamos una consultoría para definir y ordenar el flujo del proyecto.'
    });

    expect(result.email).toBe('matias@example.com');
    expect(result.project_type).toBe('consultoria');
  });

  it('rejects short descriptions', () => {
    expect(() => validateQuoteSubmission({
      name: 'Matías',
      email: 'matias@example.com',
      project_type: 'consultoria',
      timeline: 'corto',
      budget_tier: 'medio',
      description: 'corta'
    })).toThrow(/description/);
  });
});
