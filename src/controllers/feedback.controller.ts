import { Response, Request } from 'express';
import { sendFeedbackSchema } from '../schema/feedback.schema';
import { ResponseError, ResponseSuccess } from '../helpers/response.helper';
import { SendFeedback } from '../interfaces/feedback.interface';
import { FeedbackService } from '../services/feedback.service';

export class FeedbackController {
  constructor() { }

  static async sendFeedback(req: Request, res: Response) {
    const params: SendFeedback = req.body;
    try {
      /** Validate */
      await sendFeedbackSchema(params);

      /** Logic Service */
      const { result, code } = await FeedbackService.sendFeedback(params, req.cookies.refreshToken);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'FeedbackController.sendFeedback', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }
}
