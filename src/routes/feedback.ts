import express from 'express';
import { FeedbackController } from '../controllers/feedback.controller';
const router = express.Router();

/* Route Release. */
router.post('/', FeedbackController.sendFeedback);

export default router;
