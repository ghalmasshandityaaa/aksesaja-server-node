/**
 * Where to import Services
 */
// const ProductService = require('../services/product.service');

/**
 * Where to import Schema
 */
// const ProductSchema = require('../schema/product.schema');

/**
 * Where to import Models
 */
import { SignIn, SignUp } from '~/interfaces/auth.interface';
import { Users } from '../models/users';
import { Connection } from '../config/db.config';
import moment from 'moment';
import { generateRandomNumber, textDecrypt } from '../helpers/helper';
import { VerifyActivationCode } from '../interfaces/auth.interface';
import { UserVerificationCode } from '../models/user-verification-code';

export class AuthService {
  constructor() { } // private readonly companyService: CompanyService,

  static async signIn(params: SignIn) {
    try {
      const getUsers = await Users.createQueryBuilder('users')
        .where('users.email = :email', { email: params.email })
        .getOne();

      if (!getUsers) {
        throw Error('Sorry your email is not registered');
      } else if (textDecrypt(params.password) !== textDecrypt(getUsers.password)) {
        throw Error('Sorry your password is wrong');
      } else if (!getUsers.isActive) {
        throw Error('Sorry your account is not activated');
      } else if (!getUsers.password) {
        return { result: 'Password is null', code: 204 };
      }

      return { result: getUsers, code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.signIn', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async signUp(params: SignUp) {
    try {
      const getUsers = await Users.createQueryBuilder('users')
        .where('users.email = :email', { email: params.email })
        .select('users.email')
        .getOne();

      if (getUsers) {
        return { result: 'Email is registered', code: 409 };
      }

      const datatemp = {
        verificationCode: generateRandomNumber(6),
        email: params.email,
        retry: 0,
        expiredDate: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: 'API Auth SignUp',
      };

      await Connection.createQueryBuilder().insert().into(UserVerificationCode).values(datatemp).execute();

      return { result: null, code: 201 };
    } catch (e) {
      console.error({ service: 'AuthService.signUp', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async verifyActivationCode(params: VerifyActivationCode) {
    try {
      const getUserVerificationCode = await UserVerificationCode.createQueryBuilder('code')
        .where('code.email = :email', { email: params.email })
        .getOne();

      if (!getUserVerificationCode) {
        throw Error('Sorry your email is not registered');
      } else if (getUserVerificationCode.verificationCode !== params.activationCode) {
        if (getUserVerificationCode.retry + 1 <= 3) {
          await Connection.createQueryBuilder()
            .update(UserVerificationCode)
            .set({
              retry: getUserVerificationCode.retry + 1,
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedBy: 'API Auth VerifyActivationCode',
            })
            .where('email = :email', { email: params.email })
            .execute();

          throw Error(`Sorry your activation code is wrong: ${getUserVerificationCode.retry + 1}x`);
        } else {
          await Connection.createQueryBuilder()
            .delete()
            .from(UserVerificationCode)
            .where('email = :email', { email: params.email })
            .execute();

          throw Error('Sorry you reached the maximum trial limit');
        }
      } else if (getUserVerificationCode.verificationCode === params.activationCode) {
        await Connection.createQueryBuilder()
          .insert()
          .into(Users)
          .values({
            email: params.email,
            isActive: true,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
          .execute();

        await Connection.createQueryBuilder()
          .delete()
          .from(UserVerificationCode)
          .where('email = :email', { email: params.email })
          .execute();
      }

      return { result: 'Congratulations, your account has been successfully activated', code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.verifyActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
