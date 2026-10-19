require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`[Sathenna API Service] Server running in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`[Sathenna API Service] Listening on port ${PORT}`);
      console.log(`[Sathenna API Service] Health Check: http://localhost:${PORT}/api/v1/health`);
      console.log(`=======================================================`);
    });

    const shutdown = () => {
      console.log('[Sathenna API Service] Gracefully terminating server...');
      server.close(() => {
        console.log('[Sathenna API Service] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  })
  .catch((err) => {
    console.error('[Sathenna API Service] Initialization failure:', err);
    process.exit(1);
  });
