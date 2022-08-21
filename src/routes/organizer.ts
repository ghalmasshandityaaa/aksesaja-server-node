import express from 'express';
import AuthMiddleware from '../middlewares/authorization';
import { OrganizerController } from '../controllers/organizer.controller';
const router = express.Router();

/* Route Release. */
router
  .route('/')
  .get(AuthMiddleware, OrganizerController.listOrganizer)
  .post(AuthMiddleware, OrganizerController.createOrganizer)
  .put(AuthMiddleware, OrganizerController.updateOrganizer);

router.delete('/:organizerId', AuthMiddleware, OrganizerController.deleteOrganizer);
router.post('/updatePassword', AuthMiddleware, OrganizerController.updatePassword);

export default router;
