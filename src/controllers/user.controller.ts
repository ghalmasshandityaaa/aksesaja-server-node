import { Response, Request } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getAllUsers(_: Request, res: Response) {
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
