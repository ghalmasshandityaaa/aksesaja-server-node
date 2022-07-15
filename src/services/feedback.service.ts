import { SendFeedback } from '../interfaces/feedback.interface';
import { Connection } from '../config/db.config';
import { Feedback } from '../models/feedback';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export class FeedbackService {
  constructor() {}

  static async sendFeedback(params: SendFeedback) {
    try {
      /** Insert into database */
      const insertData: object = {
        feedbackId: uuidv4(),
        email: params.email,
        fullName: params.fullName,
        subject: params.subject,
        description: params.description,
        feedbackType: params.feedbackType,
        isReplied: false,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      await Connection.createQueryBuilder().insert().into(Feedback).values(insertData).execute();

      return { result: 'Successfully sent feedback', code: 200 };
    } catch (e) {
      console.error({ service: 'FeedbackService.sendFeedback', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
