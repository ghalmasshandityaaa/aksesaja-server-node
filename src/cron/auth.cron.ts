import * as cron from 'node-cron';
import { AuthService } from '../services/auth.service';

export default () => {
  /** Init cron job */
  const checkExpiredActivationCode = cron.schedule('* * * * *', AuthService.checkExpiredActivationCode);

  /** Start cron job */
  checkExpiredActivationCode.start();
}