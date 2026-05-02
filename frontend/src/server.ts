/**
 * Express server — production entry point.
 *
 * Responsibilities:
 *  - Serve the Angular SPA from dist/browser/
 *  - Expose POST /api/contact for the contact form
 *
 * Environment variables required:
 *  - RESEND_API_KEY  — Resend API key
 *  - PORT            — TCP port (default: 4000)
 *
 * Dev workflow:
 *  1. npm run build                          → builds Angular + server
 *  2. RESEND_API_KEY=re_xxx node dist/server/server.mjs
 *  3. In another terminal: npm start         → ng serve with proxy to :4000
 */

import express from 'express';
import { join } from 'path';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';

// ─── App setup ───────────────────────────────────────────────────────────────

const app = express();
const DIST_BROWSER = join(import.meta.dirname, '../browser');

app.use(express.json());

// ─── Logging ─────────────────────────────────────────────────────────────────

type LogLevel = 'info' | 'warn' | 'error';

function log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  }));
}

// ─── Security helpers ────────────────────────────────────────────────────────

/** Escapes HTML special characters to prevent XSS in email bodies. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Basic email format validation. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Rate limiting ───────────────────────────────────────────────────────────

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { success: false, error: 'Demasiados intentos. Intentá de nuevo en 15 minutos.' },
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

// ─── Resend client (lazy init) ───────────────────────────────────────────────

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const key = process.env['RESEND_API_KEY'];
    if (!key) throw new Error('RESEND_API_KEY is not set');
    resend = new Resend(key);
  }
  return resend;
}

// ─── Email templates ─────────────────────────────────────────────────────────

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

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /api/contact
 *
 * Sends two emails via Resend:
 *  1. Admin notification with form data
 *  2. Client confirmation with VIMU DEVS template
 *
 * Body: { name: string, contact: string, project: string }
 * Rate limited: 5 requests per IP per 15 minutes
 */
app.post('/api/contact', contactRateLimit, async (req, res) => {
  const { name, contact, project } = req.body as { name?: string; contact?: string; project?: string };

  if (!name?.trim() || !contact?.trim() || !project?.trim()) {
    res.status(400).json({ success: false, error: 'Todos los campos son requeridos.' });
    return;
  }

  if (!isValidEmail(contact)) {
    res.status(400).json({ success: false, error: 'El email ingresado no es válido.' });
    return;
  }

  log('info', 'contact_form_received', { name: escapeHtml(name) });

  try {
    await Promise.all([
      getResend().emails.send({
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
      getResend().emails.send({
        from: 'VIMU DEVS <noreply@vimudevs.com>',
        to: [contact],
        subject: 'Hemos recibido tu solicitud - VIMU DEVS',
        html: generateClientHTML(name)
      })
    ]);

    log('info', 'contact_emails_sent', { name: escapeHtml(name) });
    res.status(200).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    log('error', 'contact_email_failed', { error: message });
    res.status(500).json({ success: false, error: 'Error al enviar el mensaje. Intentá más tarde.' });
  }
});

// ─── Static files + SPA fallback ─────────────────────────────────────────────

app.use(express.static(DIST_BROWSER, { maxAge: '1y', index: false }));

app.get('/{*path}', (_req, res) => {
  res.sendFile(join(DIST_BROWSER, 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────────

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  log('info', 'server_started', { port });
});
