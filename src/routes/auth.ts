import express from 'express';
import AuthMiddleware from '../middlewares/authorization';
const router = express.Router();

/** Import Router */
import { AuthController } from '../controllers/auth.controller';
import { upload, uploadS3, uploadArrayS3, getObjectS3 } from '../helpers/image.helper';

/* Route Release. */
router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);
router.post('/verifyActivationCode', AuthController.verifyActivationCode);
router.post('/checkAvailabilityEmail', AuthController.checkAvailabilityEmail);
router.post('/resendActivationCode', AuthController.resendActivationCode);
router.get('/destroyCookie', AuthController.destroyCookie);
router.post('/encrypt', AuthController.encrypt);
router.post('/decrypt', AuthController.decrypt);
router.post('/logout', AuthController.logout);
router.post('/destroyCookie', AuthController.destroyCookie);
router.get('/refreshToken', AuthController.refreshToken);
router.post('/uploadFile', AuthMiddleware, upload.single('file'), async (req: any, res: any) => {
  const result = await uploadS3('users', req.file);
  res.json({
    message: 'OK',
    auth: req.auth,
    result: result,
  })
});

router.post('/uploadFiles', AuthMiddleware, upload.array('file'), async (req: any, res: any) => {
  try {
    const result = await uploadArrayS3('users', req.files);
    res.json({
      message: 'OK',
      auth: req.auth,
      result: result,
    })
  } catch (e) {
    res.json({ message: e.message })
  }
});

router.get('/getObject/:destination/:key', AuthMiddleware, async (req: any, res: any) => {
  try {
    const destination = req.params.destination;
    const key = req.params.key;
    const result = await getObjectS3(`${destination}/${key}`);
    res.send(result);
  } catch (e) {
    res.json({ message: e.message })
  }
});

export default router;
