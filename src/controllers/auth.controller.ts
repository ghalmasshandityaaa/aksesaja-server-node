import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { SignIn, SignUp } from '~/interfaces/auth.interface';
import { textDecrypt, textEncrypt } from '../helpers/helper';
import * as requestIp from 'request-ip';
import { EmailSchema, SignInSchema, SignUpSchema, VerifyActivationCodeSchema } from '../schema/auth.schema';
import { ResponseSuccess } from '../helpers/response.helper';
import { VerifyActivationCode } from '../interfaces/auth.interface';
export class AuthController {
  constructor() { }

  static async signIn(req: Request, res: Response) {
    const params: SignIn = req.body;
    try {
      /** Validate */
      await SignInSchema(params);

      /** Logic Service */
      const { result, code } = await AuthService.signIn(params);

      console.log(params.email + ' Access From : ' + requestIp.getClientIp(req));
      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'AuthController.signIn', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async signUp(req: Request, res: Response) {
    const params: SignUp = req.body;
    const email: string = req.cookies.email;
    try {
      /** Validate */
      const schema = { ...params, email }
      await SignUpSchema(schema);

      /** Logic Service */
      const { result, code } = await AuthService.signUp(params, email);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'AuthController.signUp', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async checkAvailabilityEmail(req: Request, res: Response) {
    const email: string = req.body.email;
    try {
      /** Validate */
      await EmailSchema(email);

      /** Logic Service */
      const { result, code } = await AuthService.checkAvailabilityEmail(email);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'AuthController.checkAvailabilityEmail', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async verifyActivationCode(req: Request, res: Response) {
    const email: string = req.cookies.email;
    const verificationCode: string = req.body.activationCode;
    try {
      /** Validate */
      const schema: VerifyActivationCode = { email, verificationCode };
      await VerifyActivationCodeSchema(schema);

      /** Logic Service */
      const { result, code } = await AuthService.verifyActivationCode(email, verificationCode);

      /** Response */
      ResponseSuccess(res, code, result, { name: 'email', value: email });
    } catch (e) {
      console.error({ service: 'AuthController.verifyActivationCode', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async resendActivationCode(req: Request, res: Response) {
    const email: string = req.cookies.email;
    try {
      /** Validate */
      await EmailSchema(email);

      /** Logic Service */
      const { result, code } = await AuthService.resendActivationCode(email);

      /** Response */
      ResponseSuccess(res, code, result);
    } catch (e) {
      console.error({ service: 'AuthController.resendActivationCode', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async encrypt(req: Request, res: Response) {
    const text: string = req.body.text;
    try {
      if (!text) throw Error('Text is empty');
      const encrypt = textEncrypt(text);

      /** Response */
      ResponseSuccess(res, 200, encrypt);
    } catch (e) {
      console.error({ service: 'AuthController.encrypt', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async decrypt(req: Request, res: Response) {
    const text: string = req.body.text;
    try {
      if (!text) throw Error('Text is empty');
      const decrypt = textDecrypt(text);

      /** Response */
      ResponseSuccess(res, 200, decrypt);
    } catch (e) {
      console.error({ service: 'AuthController.decrypt', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async destroyCookie(req: Request, res: Response) {
    const cookie: string = req.body.cookie;
    try {
      if (!cookie) throw Error('Cookie cannot be empty');

      res.clearCookie(cookie);
      res.end();
    } catch (e) {
      console.error({ service: 'AuthController.destroyCookie', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }
}
