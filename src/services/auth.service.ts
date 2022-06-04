import { SignIn, SignUp } from '~/interfaces/auth.interface';
import { Users } from '../models/users';
import { Connection } from '../config/db.config';
import moment from 'moment';
import { generateRandomNumber, textDecrypt } from '../helpers/helper';
import { UserVerificationCode } from '../models/user-verification-code';

export class AuthService {
  constructor() { }

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
      }

      return { result: getUsers, code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.signIn', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async signUp(params: SignUp, email: string) {
    try {
      const datatemp = {
        fullName: params.fullName,
        email,
        password: params.password,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: 'API Auth SignUp',
      };

      await Connection.createQueryBuilder().insert().into(Users).values(datatemp).execute();

      return { result: null, code: 201 };
    } catch (e) {
      console.error({ service: 'AuthService.signUp', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async verifyActivationCode(email: string, activationCode: string) {
    try {
      const getUserVerificationCode = await UserVerificationCode.createQueryBuilder('code')
        .where('code.email = :email', { email: email })
        .getOne();

      if (!getUserVerificationCode) {
        throw Error('Sorry your email is not registered');
      } else if (getUserVerificationCode.verificationCode !== activationCode) {
        if (getUserVerificationCode.retry + 1 <= 3) {
          await Connection.createQueryBuilder()
            .update(UserVerificationCode)
            .set({
              retry: getUserVerificationCode.retry + 1,
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedBy: 'API Auth VerifyActivationCode',
            })
            .where('email = :email', { email: email })
            .execute();

          throw Error(`Sorry your activation code is wrong: ${getUserVerificationCode.retry + 1}x`);
        } else {
          await Connection.createQueryBuilder()
            .delete()
            .from(UserVerificationCode)
            .where('email = :email', { email: email })
            .execute();

          throw Error('Sorry you reached the maximum trial limit');
        }
      } else if (getUserVerificationCode.verificationCode === activationCode) {
        await Connection.createQueryBuilder()
          .insert()
          .into(Users)
          .values({
            email: email,
            isActive: true,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
          .execute();
      }

      return { result: 'Congratulations, your account has been successfully activated', code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.verifyActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async checkAvailabilityEmail(email: string) {
    try {
      const checkEmail = await Users.createQueryBuilder('users')
        .where('users.email = :email', { email })
        .select('users.email')
        .getOne();

      if (checkEmail) return { result: 'Email is registered', code: 409 };

      /** Generate activation code, Begin */
      const datatemp = {
        verificationCode: generateRandomNumber(6),
        email,
        retry: 0,
        expiredDate: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: 'API Auth SignUp',
      };

      await Connection.createQueryBuilder().insert().into(UserVerificationCode).values(datatemp).execute();
      /** Generate activation code, End */

      /** Send email, Begin */
      await this.sendEmail(email, {}).then(
        async (resp) => {
          await this.setLogEMail(resp, {});
        },
        async (err) => {
          await this.setLogEMail(err, {});
        },
      );
      /** Send email, End */
      return { result: null, code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.checkAvailabilityEmail', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async sendEmail(email: string, content = {}) {
    try {
      console.log(email, content);
    } catch (e) {
      console.error({ service: 'AuthService.sendEmail', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async setLogEMail(response: any, data: any) {
    try {
      console.log(response, data);
    } catch (e) {
      console.error({ service: 'AuthService.setLogEMail', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
