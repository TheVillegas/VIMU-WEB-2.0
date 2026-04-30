import { resendClient } from '../../config/resend';
import { saveCotizacion, CotizacionRecord } from './cotizaciones.repository';

export async function submitCotizacion(
  nombre: string,
  contacto: string,
  descripcion: string
): Promise<CotizacionRecord> {
  const record = await saveCotizacion(nombre, contacto, descripcion);

  if (resendClient) {
    resendClient.emails.send({
      from: 'VIMU DEVS <no-reply@vimudevs.com>',
      to: ['proyectos@vimudevs.com'],
      subject: `Nueva cotización — ${nombre}`,
      html: `
        <h2>Nueva cotización recibida</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Contacto:</strong> ${contacto}</p>
        <p><strong>Descripción:</strong></p>
        <p>${descripcion}</p>
        <hr>
        <p style="color:#999;font-size:12px">ID: ${record.id} · ${record.created_at}</p>
      `,
    }).catch((err: unknown) => {
      console.error('[Cotizaciones] Failed to send email notification:', err);
    });
  }

  return record;
}
