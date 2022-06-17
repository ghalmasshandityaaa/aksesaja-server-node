import { SignIn, SignUp } from '~/interfaces/auth.interface';
import { Users } from '../models/users';
import { Connection } from '../config/db.config';
import moment from 'moment';
import { generateRandomNumber, textDecrypt } from '../helpers/helper';
import { UserVerificationCode } from '../models/user-verification-code';
import { MailerService } from './mailer.service';
import { MailOptionsInterface } from '../interfaces/mailer.interface';

export class AuthService {
  constructor() { }

  static async signIn(params: SignIn) {
    try {
      const getUsers = await Users.createQueryBuilder('users')
        .where('users.email = :email', { email: params.email })
        .getOne();

      if (!getUsers) {
        /** If users not found */
        throw Error('Maaf email anda belum terdaftar!');
      } else if (textDecrypt(params.password) !== textDecrypt(getUsers.password)) {
        /** if password input and db not match */
        throw Error('Maaf password anda salah!');
      } else if (!getUsers.isActive) {
        /** if account is inactive */
        throw Error('Maaf akun anda belum aktif!');
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

      /** Insert Users */
      await Connection.createQueryBuilder().insert().into(Users).values(datatemp).execute();

      return { result: null, code: 201 };
    } catch (e) {
      console.error({ service: 'AuthService.signUp', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async checkAvailabilityEmail(email: string) {
    try {
      const checkEmail = await Users.createQueryBuilder('users')
        .where('users.email = :email', { email })
        .select('users.email')
        .getOne();

      /** Check email is exist or not */
      if (checkEmail) return { result: 'Maaf email tersebut sudah terdaftar!', code: 409 };

      /** Send activation code to email users */
      await this.generateActivationCode(email);

      return { result: null, code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.checkAvailabilityEmail', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async verifyActivationCode(email: string, activationCode: string) {
    try {
      const getUserVerificationCode = await UserVerificationCode.createQueryBuilder('code')
        .where('code.email = :email', { email: email })
        .getOne();

      if (!getUserVerificationCode) {
        /** verification email not found */
        throw Error('Maaf email belum terdaftar!');
      } else if (getUserVerificationCode.verificationCode !== activationCode) {
        /** verification code not match */
        await Connection.createQueryBuilder()
          .update(UserVerificationCode)
          .set({
            retry: getUserVerificationCode.retry + 1,
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedBy: 'API Auth VerifyActivationCode',
          })
          .where('email = :email', { email: email })
          .execute();

        throw Error('Maaf kode aktivasi yang anda masukkan salah');
      }

      return { result: 'Selamat, email Anda telah berhasil diverifikasi', code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.verifyActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async resendActivationCode(email: string) {
    try {
      const checkEmailIsExist = await UserVerificationCode.createQueryBuilder('code')
        .where('code.email = :email', { email: email })
        .select('code.email')
        .getOne();

      if (!checkEmailIsExist) throw Error('Maaf email anda tidak terdaftar!'); /** If email not found */

      /** Generate verification code */
      await this.generateActivationCode(email);

      return { result: 'Kode aktivasi telah dikirim ke email Anda!', code: 200 };
    } catch (e) {
      console.error({ service: 'AuthService.resendActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async generateActivationCode(email: string) {
    try {
      /** Generate activation code, Begin */
      /** Delete existing activation code */
      await Connection.createQueryBuilder()
        .delete()
        .from(UserVerificationCode)
        .where('email = :email', { email })
        .execute();

      const activationCode = generateRandomNumber(6);

      const datatemp = {
        verificationCode: activationCode,
        email,
        retry: 0,
        expiredDate: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: 'API Auth SignUp',
      };

      await Connection.createQueryBuilder().insert().into(UserVerificationCode).values(datatemp).execute();
      /** Generate activation code, End */

      /** Send email, Begin */
      const mailOptions: MailOptionsInterface = {
        to: email,
        subject: 'Activation Code',
        template: 'activation-code',
        context: {
          title: 'Activation Code',
          activationCode: activationCode.split(''),
        },
        description: 'Activation Code',
      };

      await MailerService.sendEmail(mailOptions);
      /** Send email, End */
    } catch (e) {
      console.error({ service: 'AuthService.generateActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async checkExpiredActivationCode() {
    try {
      await Connection.createQueryBuilder()
        .delete()
        .from(UserVerificationCode)
        .where('expired_date < :expiredDate', { expiredDate: moment().format('YYYY-MM-DD HH:mm:ss') })
        .execute();
      console.info('Running Cron Job: CheckExpiredActivationCode');
    } catch (e) {
      console.error({ service: 'AuthService.checkExpiredActivationCode', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
