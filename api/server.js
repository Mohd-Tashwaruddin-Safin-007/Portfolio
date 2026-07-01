// Long-lived Express server — deployed as a Render Web Service.
// In dev: `npm run dev`. In prod: Render runs `npm start` which calls this file.

import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const port = Number(process.env.PORT) || 5000;
const host = process.env.HOST || '0.0.0.0';
const app = createApp();

(async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    // Don't crash immediately — Render health checks need the process up.
    // Endpoints that touch the DB will return 500 with a helpful message.
  }

  app.listen(port, host, () => {
    console.log(`🚀 API listening on http://${host}:${port}`);
  });
})();