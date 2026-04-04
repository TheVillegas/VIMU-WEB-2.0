import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import quotesRoutes from './modules/quotes/quotes.routes';
import authRoutes from './modules/auth/auth.routes';
import adminRoutes from './modules/admin/admin.routes';

const app = express();

const allowedOrigins = [
  'https://www.vimudevs.com',
  'https://vimudevs.com',
  'http://localhost:4200',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions));
app.use(helmet());
app.use(express.json());

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
