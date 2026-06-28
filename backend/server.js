const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');

/**
 * Server Entry Point
 * Connects to MongoDB, then starts Express.
 */
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(`\n🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
      console.log(`📍 Health: http://localhost:${config.port}/api/health`);
      console.log(`📍 Tasks:  http://localhost:${config.port}/api/tasks\n`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (err) => {
      console.error('❌ Unhandled Rejection:', err.message);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
