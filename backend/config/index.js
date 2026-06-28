require('dotenv').config();

/**
 * Centralized Configuration
 * All environment variables accessed through this single module.
 */
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-tracker',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  get isDev() {
    return this.nodeEnv === 'development';
  },
  get isProd() {
    return this.nodeEnv === 'production';
  },
};

// Validate critical env vars in production
if (config.isProd && !process.env.MONGODB_URI) {
  console.error('❌ FATAL: MONGODB_URI is required in production');
  process.exit(1);
}

module.exports = config;
