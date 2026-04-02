import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import quotesRoutes from './modules/quotes/quotes.routes';
import authRoutes from './modules/auth/auth.routes';
import adminRoutes from './modules/admin/admin.routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:4200',
  credentials: true
}));

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'VIMU DEVS Backend running' });
});

app.use('/api/quotes', quotesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
