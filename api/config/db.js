import mongoose from 'mongoose';

let cachedConnection = null;

export async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Add it to api/.env or Vercel env vars.');
  }

  // Serverless-friendly: small buffer, timeouts, and reuse the connection across invocations.
  cachedConnection = await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || 'portfolio',
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
    maxPoolSize: 10,
  });

  return cachedConnection;
}
