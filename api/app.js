import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import experienceRoutes from './routes/experience.js';
import messageRoutes from './routes/messages.js';
import seedRoutes from './routes/seed.js';

import { connectDB } from './config/db.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  const allowedOrigin = process.env.CLIENT_ORIGIN || '*';
  app.use(
    cors({
      origin: allowedOrigin === '*' ? true : allowedOrigin.split(',').map((s) => s.trim()),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  // Safety net: ensure the DB is connected before every request.
  // On Render the connection is established at boot, but if Atlas drops and reconnects,
  // this middleware will re-attach on the next request instead of crashing.
  app.use(async (_req, _res, next) => {
    try {
      await connectDB();
      next();
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.use('/api/profile', profileRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/seed', seedRoutes);

  // 404
  app.use('/api', (_req, res) => res.status(404).json({ message: 'Not Found' }));

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error('API error:', err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}
