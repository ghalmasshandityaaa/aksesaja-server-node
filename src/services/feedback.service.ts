import { SendFeedback } from '../interfaces/feedback.interface';
import { Connection } from '../config/db.config';
import { Feedback } from '../models/feedback';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import jwtDecode from 'jwt-decode';
import { Auth } from '~/interfaces/auth.interface';

export class FeedbackService {
  constructor() { }

  static async sendFeedback(params: SendFeedback, refreshToken: string) {
    let email;
    try {
      /**  check if users logged in, send email include into database */
      if (refreshToken) {
        const isLogin = jwtDecode<Auth>(refreshToken);

        if (isLogin) {
          email = isLogin.email;
        }
      }

      /** Insert into database */
      const insertData: object = {
        feedbackId: uuidv4(),
        email,
        fullName: params.fullName,
        subject: params.subject,
        description: params.description,
        feedbackType: params.feedbackType,
        isReplied: false,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      await Connection.createQueryBuilder().insert().into(Feedback).values(insertData).execute();

      return { result: 'Sucessfully sent fecedback', code: 200 };
    } catch (e) {
      console.error({ service: 'FeedbackService.sendFeedback', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
