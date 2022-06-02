import express from 'express';
const router = express.Router();

/** Import Router */
import { AuthController } from '../controllers/auth.controller';

/* Route Release. */
router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);

export default router;
