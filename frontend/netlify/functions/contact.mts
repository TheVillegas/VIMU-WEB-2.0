import type { Context } from '@netlify/functions';
import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateClientHTML(nombre: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hemos recibido tu solicitud - VIMU DEVS</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111;border:1px solid #222;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 32px;border-bottom:1px solid #222;">
              <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.15em;color:#666;text-transform:uppercase;">VIMU DEVS SpA</p>
              <h1 style="margin:12px 0 0;font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.02em;line-height:1.2;">Recibimos tu solicitud.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#aaa;">Hola <strong style="color:#fff;">${escapeHtml(nombre)}</strong>,</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#aaa;">
                Gracias por contactarnos. Revisamos tu mensaje y nos ponemos en contacto dentro de las
                <strong style="color:#fff;">48 horas h&aacute;biles</strong> siguientes.
              </p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.6;color:#aaa;">
                Si la consulta es urgente, pod&eacute;s escribirnos directamente por WhatsApp o Instagram.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="https://wa.me/56988621058" style="display:inline-block;padding:12px 24px;background:#fff;color:#000;font-size:13px;font-weight:600;letter-spacing:0.05em;text-decoration:none;border-radius:4px;">WhatsApp</a>
                  </td>
                  <td>
                    <a href="https://instagram.com/vimudevs" style="display:inline-block;padding:12px 24px;background:transparent;color:#fff;font-size:13px;font-weight:600;letter-spacing:0.05em;text-decoration:none;border-radius:4px;border:1px solid #333;">@vimudevs</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #222;">
              <p style="margin:0;font-size:12px;color:#555;line-height:1.6;">
                VIMU DEVS SpA &mdash; Santiago, Chile<br />
                <a href="https://vimudevs.com" style="color:#555;text-decoration:underline;">vimudevs.com</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:administracion@vimudevs.com" style="color:#555;text-decoration:underline;">administracion@vimudevs.com</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#333;">&copy; ${year} VIMU DEVS SpA. Todos los derechos reservados.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: Request, _context: Context): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body: { name?: string; contact?: string; project?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { name, contact, project } = body;

  if (!name?.trim() || !contact?.trim() || !project?.trim()) {
    return new Response(
      JSON.stringify({ success: false, error: 'Todos los campos son requeridos.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!isValidEmail(contact)) {
    return new Response(
      JSON.stringify({ success: false, error: 'El email ingresado no es válido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const key = process.env['RESEND_API_KEY'];
  if (!key) {
    return new Response(
      JSON.stringify({ success: false, error: 'Server misconfiguration.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(key);

  try {
    await Promise.all([
      resend.emails.send({
        from: 'VIMU DEVS <noreply@vimudevs.com>',
        to: ['matias.villegas.m@vimudevs.com'],
        subject: `Nuevo contacto: ${escapeHtml(name)}`,
        html: `
          <h2>Nuevo mensaje desde vimudevs.com</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(contact)}</p>
          <p><strong>Proyecto:</strong></p>
          <p>${escapeHtml(project)}</p>
        `
      }),
      resend.emails.send({
        from: 'VIMU DEVS <noreply@vimudevs.com>',
        to: [contact],
        subject: 'Hemos recibido tu solicitud - VIMU DEVS',
        html: generateClientHTML(name)
      })
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact-function] email send failed:', message);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al enviar el mensaje. Intentá más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
