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

router.route('/:organizerId')
  .get(AuthMiddleware, OrganizerController.detailOrganizer)
  .delete(AuthMiddleware, OrganizerController.deleteOrganizer);
router.post('/updatePassword', AuthMiddleware, OrganizerController.updatePassword);
router.get('/:organizerId/details', AuthMiddleware, OrganizerController.detailInformationOrganizer);

export default router;
