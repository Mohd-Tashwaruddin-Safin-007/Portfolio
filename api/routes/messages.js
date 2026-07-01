import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { createMessage, listMessages } from '../controllers/messageController.js';

const router = Router();

// Basic spam protection: max 5 messages per 10 minutes per IP.
const messageLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ msg: 'Too many messages, please try again later.' }] },
});

const validateMessage = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').optional().isLength({ max: 200 }),
  body('body').trim().notEmpty().withMessage('Message body is required').isLength({ max: 5000 }),
];

router.post(
  '/',
  messageLimiter,
  validateMessage,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createMessage(req, res);
  })
);

router.get('/', asyncHandler(listMessages));

export default router;
