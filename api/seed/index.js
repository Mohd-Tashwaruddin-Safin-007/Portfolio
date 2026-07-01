// Standalone seed runner: `npm run seed` inside /api
import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { seedDatabase } from './seedData.js';

(async () => {
  try {
    await connectDB();
    const result = await seedDatabase();
    console.log('✅ Seed complete:', result);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
})();
