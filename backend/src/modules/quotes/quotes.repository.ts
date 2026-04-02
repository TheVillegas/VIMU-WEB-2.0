import pool from '../../config/db';
import { QuoteRecord } from './quotes.types';

export async function createQuoteRecord(input: Omit<QuoteRecord, 'id' | 'created_at' | 'updated_at'>): Promise<QuoteRecord> {
  const query = `
    INSERT INTO quotes (
      company_name, email, whatsapp, project_type, timeline, budget_tier,
      budget_amount, priority, expected_metrics, business_needs, status, notes
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11, $12
    )
    RETURNING *
  `;

  const values = [
    input.company_name,
    input.email,
    input.whatsapp,
    input.project_type,
    input.timeline,
    input.budget_tier,
    input.budget_amount,
    input.priority,
    input.expected_metrics,
    input.business_needs,
    input.status,
    input.notes
  ];

  const { rows } = await pool.query<QuoteRecord>(query, values);
  return rows[0];
}
