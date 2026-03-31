import express from 'express';

const app = express();

app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'VIMU DEVS Backend running' });
});

export default app;
