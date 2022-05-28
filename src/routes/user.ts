import express from 'express';
const router = express.Router();

/** Import Router */
import { UserController } from '../controllers/user.controller';

/* Route Release. */
router.get('/', UserController.getAllUsers);

export default router;
