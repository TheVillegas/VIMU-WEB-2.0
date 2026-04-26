import { describe, expect, it } from 'vitest';
import { mapSubmissionToQuote } from './quotes.mapper';

describe('mapSubmissionToQuote', () => {
  it('maps the public submission to the quotes record shape', () => {
    const mapped = mapSubmissionToQuote({
      name: 'Matías',
      email: 'MATIAS@EXAMPLE.COM',
      phone: '+56912345678',
      company: 'VIMU DEVS',
      project_type: 'full_stack',
      timeline: 'medio',
      budget_tier: 'alto',
      description: 'Necesitamos construir una plataforma para digitalizar el proceso interno.'
    });

    expect(mapped.company_name).toBe('VIMU DEVS');
    expect(mapped.email).toBe('matias@example.com');
    expect(mapped.whatsapp).toBe('+56912345678');
    expect(mapped.priority).toBe('Urgent');
    expect(mapped.budget_amount).toBe(500000);
    expect(mapped.business_needs).toContain('Medium');
  });
});
