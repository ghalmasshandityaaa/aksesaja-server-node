import { Response } from 'express';
import { ResponseError, ResponseSuccess } from '../helpers/response.helper';
import { RegisterOrganizer, UpdateDetailOrganizer, UpdateOrganizer, UpdatePassword } from '../interfaces/organizer.interface';
import { checkOrganizerIdSchema, registerSchema, updateOrganizerSchema, updatePasswordSchema, updateDetailInformationOrganizer } from '../schema/organizer.schema';
import { OrganizerService } from '../services/organizer.service';
import { Auth } from '../interfaces/auth.interface';
import { AuthRequest } from '../middlewares/authorization';

export class OrganizerController {
  static async createOrganizer(req: AuthRequest, res: Response) {
    const params: RegisterOrganizer = req.body;
    const auth: Auth = req.auth!;
    try {
      /** Validate */
      await registerSchema(params);

      /** Logic Service */
      const { result, code } = await OrganizerService.createOrganizer(params, auth);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.createOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async listOrganizer(req: AuthRequest, res: Response) {
    const auth: Auth = req.auth!;
    try {
      /** Logic Service */
      const { result, code } = await OrganizerService.listOrganizer(auth);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.listOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async updateOrganizer(req: AuthRequest, res: Response) {
    const params: UpdateOrganizer = req.body;
    const auth: Auth = req.auth!;
    try {
      /** Validate */
      await updateOrganizerSchema(params);

      /** Logic Service */
      const { result, code } = await OrganizerService.updateOrganizer(params, auth);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.updateOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async deleteOrganizer(req: AuthRequest, res: Response) {
    const { organizerId } = req.params;
    const auth: Auth = req.auth!;
    try {
      /** Logic Service */
      const { result, code } = await OrganizerService.deleteOrganizer(organizerId, auth);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.deleteOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async updatePassword(req: AuthRequest, res: Response) {
    const params: UpdatePassword = req.body;
    try {
      /** Validate */
      await updatePasswordSchema(params);

      /** Logic Service */
      const { result, code } = await OrganizerService.updatePassword(params);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.updatePassword', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async detailOrganizer(req: AuthRequest, res: Response) {
    const { organizerId } = req.params;
    try {
      /** Validate */
      await checkOrganizerIdSchema({ organizerId });

      /** Logic Service */
      const { result, code } = await OrganizerService.detailOrganizer(organizerId);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.detailOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async detailInformationOrganizer(req: AuthRequest, res: Response) {
    const { organizerId } = req.params;
    try {
      /** Validate */
      await checkOrganizerIdSchema({ organizerId });

      /** Logic Service */
      const result = await OrganizerService.detailInformationOrganizer(organizerId);

      /** Response */
      ResponseSuccess(res, 200, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.detailInformationOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async updateDetailInformationOrganizer(req: AuthRequest, res: Response) {
    const params: UpdateDetailOrganizer = req.body;
    try {
      /** Validate */
      await updateDetailInformationOrganizer(params);

      /** Logic Service */
      const result = await OrganizerService.updateDetailInformationOrganizer(params);

      /** Response */
      ResponseSuccess(res, 200, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.updateDetailInformationOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async statsOrganizer(req: AuthRequest, res: Response) {
    const { organizerId } = req.params;
    try {
      /** Validate */
      await checkOrganizerIdSchema({ organizerId });

      /** Logic Service */
      const result = await OrganizerService.statsOrganizer(organizerId);

      /** Response */
      ResponseSuccess(res, 200, result);
    } catch (e) {
      console.error({ service: 'OrganizerController.statsOrganizer', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }
}
