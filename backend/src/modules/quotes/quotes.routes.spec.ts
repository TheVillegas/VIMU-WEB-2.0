import { describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { buildQuotesRouter } from './quotes.routes';

describe('POST /api/quotes', () => {
  it('returns 201 when the payload is valid', async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/quotes', buildQuotesRouter(vi.fn().mockResolvedValue({ id: '1' })));

    const response = await request(app)
      .post('/api/quotes')
      .send({
        name: 'Matías',
        email: 'matias@example.com',
        phone: '+56912345678',
        company: 'VIMU DEVS',
        project_type: 'consultoria',
        timeline: 'corto',
        budget_tier: 'medio',
        description: 'Necesitamos una consultoría para ordenar el proyecto y definir alcance.'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Quote submitted successfully');
  });

  it('returns 400 for invalid payloads', async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/quotes', buildQuotesRouter(vi.fn()));

    const response = await request(app)
      .post('/api/quotes')
      .send({
        name: 'Matías'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Invalid/);
  });
});
