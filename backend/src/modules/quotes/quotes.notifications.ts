import { resendClient } from '../../config/resend';
import { QuoteSubmissionInput } from './quotes.types';

const budgetLabel: Record<string, string> = {
  bajo: '50.000 – 150.000 CLP',
  medio: '150.000 – 300.000 CLP',
  alto: '300.000 – 500.000 CLP',
  extremo: '500.000 – 1.000.000 CLP',
  a_consultar: 'A consultar',
};

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
      <p><strong>Presupuesto:</strong> ${budgetLabel[quote.budget_tier] ?? quote.budget_tier}</p>
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
      <h2>¡Hola, ${quote.name || quote.company_name}!</h2>

      <p>Qué gusto saludarte. Gracias por considerarnos para ayudarte con <strong>${quote.project_type}</strong>.</p>

      <p>Acabo de recibir tu mensaje y me encanta la pinta que tiene el proyecto. Voy a darle una vuelta a la información que nos pasaste para ver cómo podemos aportar el máximo valor.</p>

      <h3>¿Qué sigue ahora?</h3>

      <p>Te escribiré pronto para que charlemos un poco más a fondo y poder revisar cómo podemos sacarle el máximo potencial a tu proyecto.</p>

      <br>
      <p>Saludos,</p>
      <p><strong>Matias Villegas Muñoz</strong><br>CEO — VIMU DEVS</p>
    `
  });

  if (userError) {
    console.error('[Resend] User email error:', userError);
  }

  return { user: userData ?? null, admin: adminData ?? null };
}
