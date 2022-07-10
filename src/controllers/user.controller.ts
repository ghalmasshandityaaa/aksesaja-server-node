import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middlewares/authorization';
import { ResponseError, ResponseSuccess } from '../helpers/response.helper';
import { Auth } from '../interfaces/auth.interface';
import { userDataSchema } from '../schema/user.schema';

export class UserController {
  static async getAllUsers(_: AuthRequest, res: Response) {
    try {
      const result = await UserService.getAllUsers();

      /** Response */
      ResponseSuccess(res, 200, result);
    } catch (e) {
      console.error({ service: 'UserController.getAllUsers', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }

  static async userData(req: AuthRequest, res: Response) {
    const users: Auth = req.auth!;
    try {
      /** Validate */
      await userDataSchema(users);

      /** Logic Service */
      const { result, code } = await UserService.userData(users);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'AuthController.userData', message: e.message, stack: e.stack });
      ResponseError(res, 400, e);
    }
  }
}
