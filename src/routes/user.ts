import express from 'express';
const router = express.Router();

/** Import Router */
import { UserController } from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/authorization';

/* Route Release. */
router.get('/', AuthMiddleware, UserController.getAllUsers);
router.get('/userData', AuthMiddleware, UserController.userData);

export default router;
