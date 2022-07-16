import { Response } from 'express';
import { UploadBanner } from '../interfaces/banner.interface';
import { ResponseError, ResponseSuccess } from '../helpers/response.helper';
import { BannerService } from '../services/banner.service';
import { uploadBannerSchema } from '../schema/banner.schema';
import { Auth } from '~/interfaces/auth.interface';
import { AuthRequest } from '../middlewares/authorization';

export class BannerController {
  constructor() { }

  static async uploadBanner(req: AuthRequest, res: Response) {
    const params: UploadBanner = req.body;
    try {
      const auth: Auth = req.auth!;
      /** Validate */
      await uploadBannerSchema(params);

      /** Logic Service */
      const { result, code } = await BannerService.uploadBanner(params, auth);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'BannerController.uploadBanner', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async getAllBanner(_req: AuthRequest, res: Response) {
    try {
      /** Logic Service */
      const { result, code } = await BannerService.getAllBanner();

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'BannerController.getAllBanner', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async getHomepageBanner(_req: AuthRequest, res: Response) {
    try {
      /** Logic Service */
      const { result, code } = await BannerService.getHomepageBanner();

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'BannerController.getHomepageBanner', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }
}
