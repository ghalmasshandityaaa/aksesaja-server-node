import { Response, Request } from 'express';

/**
 * Where to import Services
 */
import { UserService } from '../services/user.service';

/**
 * Where to import Helpers
 */
// const responseHelper = require('../helpers/response.helper');

/**
 * Where to import Schema
 */
// const ProductSchema = require('../schema/product.schema');

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
