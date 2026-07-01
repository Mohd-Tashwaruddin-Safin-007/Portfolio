import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getProfile, upsertProfile } from '../controllers/profileController.js';

const router = Router();

router.get('/', asyncHandler(getProfile));
router.put('/', asyncHandler(upsertProfile));

export default router;
