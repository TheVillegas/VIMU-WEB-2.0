import { Router, Request, Response } from 'express';
import { submitCotizacion } from './cotizaciones.service';
import { createCotizacionesTable } from './cotizaciones.repository';

const router = Router();

// Run migration on first load
createCotizacionesTable().catch((err) => {
  console.error('[Cotizaciones] Failed to create table:', err);
});

router.post('/', async (req: Request, res: Response) => {
  const { nombre, contacto, descripcion } = req.body as {
    nombre?: string;
    contacto?: string;
    descripcion?: string;
  };

  if (!nombre?.trim() || nombre.trim().length < 2) {
    res.status(400).json({ message: 'El nombre debe tener al menos 2 caracteres.' });
    return;
  }

  if (!contacto?.trim()) {
    res.status(400).json({ message: 'El contacto es requerido.' });
    return;
  }

  if (!descripcion?.trim() || descripcion.trim().length < 10) {
    res.status(400).json({ message: 'La descripción debe tener al menos 10 caracteres.' });
    return;
  }

  try {
    const record = await submitCotizacion(
      nombre.trim(),
      contacto.trim(),
      descripcion.trim()
    );
    res.status(201).json({ id: record.id, message: 'Cotización recibida correctamente.' });
  } catch (err) {
    console.error('[Cotizaciones] Error saving cotizacion:', err);
    res.status(500).json({ message: 'Error al procesar la cotización. Intentá de nuevo.' });
  }
});

export default router;
