import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = Router();

router.get('/', asyncHandler(getProjects));
router.get('/:id', asyncHandler(getProjectById));
router.post('/', asyncHandler(createProject));
router.put('/:id', asyncHandler(updateProject));
router.delete('/:id', asyncHandler(deleteProject));

export default router;
