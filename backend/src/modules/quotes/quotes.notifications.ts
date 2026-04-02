import { resendClient } from '../../config/resend';
import { QuoteSubmissionInput } from './quotes.types';

type QuoteRecipient = QuoteSubmissionInput & {
  company_name: string;
  priority: string;
  budget_amount: number | null;
};

export async function sendQuoteNotifications(quote: QuoteRecipient) {
  if (!resendClient) return { user: null, admin: null };

  const from = 'VIMU DEVS <noreply@vimudevs.com>';
  const adminTo = ['proyectos@vimudevs.com'];
  const userTo = [quote.email];

  const { data: adminData, error: adminError } = await resendClient.emails.send({
    from,
    to: adminTo,
    subject: `Nueva cotización: ${quote.company_name}`,
    html: `
      <h1>Nueva cotización recibida</h1>
      <p><strong>Cliente:</strong> ${quote.company_name}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Teléfono:</strong> ${quote.phone ?? 'No informado'}</p>
      <p><strong>Proyecto:</strong> ${quote.project_type}</p>
      <p><strong>Timeline:</strong> ${quote.timeline}</p>
      <p><strong>Presupuesto:</strong> ${quote.budget_tier}</p>
      <p><strong>Prioridad:</strong> ${quote.priority}</p>
      <p><strong>Descripción:</strong><br>${quote.description}</p>
    `
  });

  if (adminError) {
    console.error('[Resend] Admin email error:', adminError);
  }

  const { data: userData, error: userError } = await resendClient.emails.send({
    from,
    to: userTo,
    subject: 'Recibimos tu solicitud en VIMU DEVS',
    html: `
      <h1>Gracias por contactar a VIMU DEVS</h1>
      <p>Recibimos tu solicitud y vamos a revisarla pronto.</p>
      <p><strong>Proyecto:</strong> ${quote.project_type}</p>
      <p><strong>Descripción:</strong><br>${quote.description}</p>
    `
  });

  if (userError) {
    console.error('[Resend] User email error:', userError);
  }

  return { user: userData ?? null, admin: adminData ?? null };
}
