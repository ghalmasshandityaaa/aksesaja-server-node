import express from 'express';
const router = express.Router();

/** Import Router */
import { AuthController } from '../controllers/auth.controller';

/* Route Release. */
router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);
router.post('/verifyActivationCode', AuthController.verifyActivationCode);
router.post('/checkAvailabilityEmail', AuthController.checkAvailabilityEmail);
router.post('/encrypt', AuthController.encrypt);
router.post('/decrypt', AuthController.decrypt);

export default router;
