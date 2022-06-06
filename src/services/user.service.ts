import { Users } from '../models/users';

export class UserService {
  constructor() {}

  static async getAllUsers() {
    try {
      const getUsers = await Users.createQueryBuilder('users').getMany();

      return getUsers;
    } catch (e) {
      console.error({ service: 'UserController.getAllUsers', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
