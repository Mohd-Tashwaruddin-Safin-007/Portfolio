import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';

const router = Router();

router.get('/', asyncHandler(getExperience));
router.post('/', asyncHandler(createExperience));
router.put('/:id', asyncHandler(updateExperience));
router.delete('/:id', asyncHandler(deleteExperience));

export default router;
