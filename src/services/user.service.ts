import { Users } from '../models/users';
import { Auth } from '../interfaces/auth.interface';
import moment from 'moment';
import { Connection } from '../config/db.config';
import { UserPersonal } from '../models/user-personal';
import { StatusVerification } from '../models/status-verification';

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

  static async userData(users: Auth) {
    try {
      const getUsers = await Connection.createQueryBuilder(Users, 'users')
        .leftJoinAndMapOne('users.userPersonal', UserPersonal, 'userPersonal', 'userPersonal.userId = users.userId')
        .leftJoinAndMapOne(
          'userPersonal.statusVerification',
          StatusVerification,
          'statusVerification',
          'statusVerification.statusVerificationId = userPersonal.statusVerificationId',
        )
        .where('users.userId = :userId', { userId: users.userId })
        .getOne();

      if (!getUsers) throw Error('User not found');

      getUsers.createdAt = moment(getUsers.createdAt).format('YYYY-MM-DD HH:mm:ss');
      getUsers.updatedAt = getUsers.updatedAt ? moment(getUsers.updatedAt).format('YYYY-MM-DD HH:mm:ss') : null;

      const userData: object = {
        userId: getUsers.userId,
        fullName: getUsers.fullName,
        email: getUsers.email,
        isActive: getUsers.isActive,
        createdAt: getUsers.createdAt,
        updatedAt: moment(getUsers.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedBy: getUsers.updatedAt ? moment(getUsers.updatedAt).format('YYYY-MM-DD HH:mm:ss') : null,
        photo: getUsers.userPersonal ? getUsers.userPersonal.photo : null,
        gender: getUsers.userPersonal ? getUsers.userPersonal.gender : null,
        birthdate: getUsers.userPersonal ? moment(getUsers.userPersonal.birthdate).format('YYYY-MM-DD') : null,
        birthplace: getUsers.userPersonal ? getUsers.userPersonal.birthplace : null,
        institution: getUsers.userPersonal ? getUsers.userPersonal.institution : null,
        status: getUsers.userPersonal?.statusVerification ? getUsers.userPersonal.statusVerification.statusName : null,
      };

      return { result: userData, code: 200 };
    } catch (e) {
      console.error({ service: 'UserController.userData', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
