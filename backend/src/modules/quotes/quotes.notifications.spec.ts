import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../config/resend', () => ({
  resendClient: {
  emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'email-id' }, error: null })
    }
  }
}));

import { sendQuoteNotifications } from './quotes.notifications';

describe('sendQuoteNotifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends confirmation and admin emails', async () => {
    const result = await sendQuoteNotifications({
      name: 'Matías',
      email: 'matias@example.com',
      phone: '+56912345678',
      company: 'VIMU DEVS',
      company_name: 'VIMU DEVS',
      project_type: 'consultoria',
      timeline: 'corto',
      budget_tier: 'medio',
      budget_amount: 2000000,
      priority: 'Normal',
      description: 'Necesitamos una consultoría para ordenar el proyecto y definir alcance.'
    });

    expect(result.admin).toEqual({ id: 'email-id' });
    expect(result.user).toEqual({ id: 'email-id' });
  });
});
