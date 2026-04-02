import pool from '../../config/db';
import { QuoteRecord, QuoteStatus } from '../quotes/quotes.types';

export interface QuoteFilters {
  status?: QuoteStatus;
  from?: string;
  to?: string;
}

export interface QuoteStatsRow {
  status: QuoteStatus;
  count: number;
}

export async function getQuoteStats() {
  const { rows } = await pool.query<QuoteStatsRow>(
    `SELECT status, COUNT(*)::int AS count
     FROM quotes
     GROUP BY status`
  );

  const stats: Record<QuoteStatus, number> & { total: number } = { total: 0, nuevo: 0, visto: 0, respondido: 0, cerrado: 0 };

  for (const row of rows) {
    stats[row.status] = row.count;
    stats.total += row.count;
  }

  return stats;
}

export async function listQuotes(filters: QuoteFilters = {}): Promise<QuoteRecord[]> {
  const clauses: string[] = [];
  const values: Array<string> = [];

  if (filters.status) {
    values.push(filters.status);
    clauses.push(`status = $${values.length}`);
  }

  if (filters.from) {
    values.push(filters.from);
    clauses.push(`created_at::date >= $${values.length}::date`);
  }

  if (filters.to) {
    values.push(filters.to);
    clauses.push(`created_at::date <= $${values.length}::date`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const query = `SELECT * FROM quotes ${where} ORDER BY created_at DESC`;

  const { rows } = await pool.query<QuoteRecord>(query, values);
  return rows;
}

export async function getQuoteById(id: string): Promise<QuoteRecord | null> {
  const { rows } = await pool.query<QuoteRecord>('SELECT * FROM quotes WHERE id = $1 LIMIT 1', [id]);
  return rows[0] ?? null;
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<QuoteRecord | null> {
  const { rows } = await pool.query<QuoteRecord>(
    'UPDATE quotes SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id, status]
  );

  return rows[0] ?? null;
}
