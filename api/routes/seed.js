import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { seedDatabase } from '../seed/seedData.js';

const router = Router();

// Wipes and re-seeds the database with the bundled portfolio data.
// Useful after the first deploy to populate MongoDB Atlas.
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const result = await seedDatabase();
    res.status(200).json({ message: 'Database seeded.', ...result });
  })
);

export default router;