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
router.route('/:organizerId/details')
  .get(AuthMiddleware, OrganizerController.detailInformationOrganizer)
  .put(AuthMiddleware, OrganizerController.updateDetailInformationOrganizer);

router.get('/:organizerId/stats', AuthMiddleware, OrganizerController.statsOrganizer);
router.post('/signIn', AuthMiddleware, OrganizerController.signIn)

export default router;
