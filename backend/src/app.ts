import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import quotesRoutes from './modules/quotes/quotes.routes';
import authRoutes from './modules/auth/auth.routes';
import adminRoutes from './modules/admin/admin.routes';

const app = express();

app.use(express.json());
app.use(helmet());
const rawOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';
const allowedOrigins = [
  rawOrigin,
  rawOrigin.startsWith('https://') ? rawOrigin.replace('https://', 'http://') : rawOrigin.replace('http://', 'https://'),
  `https://www.vimudevs.com`,
  `https://vimudevs.com`,
  'http://localhost:4200',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
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
