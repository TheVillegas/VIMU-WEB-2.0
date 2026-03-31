import app from './app';
import pool from './config/db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Test database connection
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('Connected to PostgreSQL:', res.rows[0].now);
        client.release();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
