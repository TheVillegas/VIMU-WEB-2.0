import pool from '../../config/db';

export interface CotizacionRecord {
  id: number;
  nombre: string;
  contacto: string;
  descripcion: string;
  estado: string;
  created_at: Date;
}

export async function createCotizacionesTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cotizaciones (
      id          SERIAL PRIMARY KEY,
      nombre      TEXT NOT NULL,
      contacto    TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      estado      TEXT NOT NULL DEFAULT 'nuevo',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export async function saveCotizacion(
  nombre: string,
  contacto: string,
  descripcion: string
): Promise<CotizacionRecord> {
  const { rows } = await pool.query<CotizacionRecord>(
    `INSERT INTO cotizaciones (nombre, contacto, descripcion)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, contacto, descripcion]
  );
  return rows[0];
}
