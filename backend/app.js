const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const ApiError = require('./utils/ApiError');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// ─── Security ───
app.use(helmet());

// ─── CORS ───
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ─── Body Parsers ───
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───
if (config.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Tracker API is running',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───
app.use('/api/tasks', taskRoutes);

// ─── 404 Handler ───
app.all('*', (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

// ─── Error Handler ───
app.use(errorHandler);

module.exports = app;
