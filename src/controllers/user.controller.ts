import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middlewares/authorization';

export class UserController {
  static async getAllUsers(_: AuthRequest, res: Response) {
    try {
      const result = await UserService.getAllUsers();

      res.status(200).json({
        message: 'Success',
        data: result,
      });
    } catch (e) {
      console.error({ service: 'UserController.getAllUsers', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }
}
