import express from 'express';
import { BannerController } from '../controllers/banner.controller';
import AuthMiddleware from '../middlewares/authorization';
const router = express.Router();

/* Route Release. */
router
  .route('/')
  .post(AuthMiddleware, BannerController.uploadBanner)
  .get(AuthMiddleware, BannerController.getAllBanner);

router.get('/homepage', AuthMiddleware, BannerController.getHomepageBanner);

export default router;
