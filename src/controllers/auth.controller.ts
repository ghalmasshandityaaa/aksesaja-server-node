import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { SignIn, SignUp } from '~/interfaces/auth.interface';
import { textDecrypt, textEncrypt } from '../helpers/helper';
import { COOKIES_OPTIONS } from '../constants/auth.constant';
import * as requestIp from 'request-ip';
export class AuthController {
  constructor() { }

  static async signIn(req: Request, res: Response) {
    const params: SignIn = req.body;
    try {
      if (!params.email || !params.password) throw Error('Email or Password is empty');
      const { result, code } = await AuthService.signIn(params);

      console.log(params.email + ' Access From : ' + requestIp.getClientIp(req))
      if (code === 200) {
        res.status(code).json({
          message: 'Success',
          data: result,
        });
      } else {
        res.status(code).json({
          message: result,
        });
      }
    } catch (e) {
      console.error({ service: 'AuthController.signIn', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async signUp(req: Request, res: Response) {
    const params: SignUp = req.body;
    const email: string = req.cookies.email;
    try {
      if (!email) throw Error('Email is empty');
      else if (!params.password) throw Error('required');
      else if (!params.fullName) throw Error('fullName is required');

      const { result, code } = await AuthService.signUp(params, email);

      if (code !== 201) {
        res.status(code).json({
          message: 'Error',
          error: result,
        });
      } else {
        res.status(code).json({
          message: 'Success',
          data: result,
        });
      }
    } catch (e) {
      console.error({ service: 'AuthController.signUp', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async checkAvailabilityEmail(req: Request, res: Response) {
    const email: string = req.body.email;
    try {
      if (!email) throw Error('Email is empty');
      const { result, code } = await AuthService.checkAvailabilityEmail(email);

      if (code !== 200) {
        res.status(code).json({
          message: 'Error',
          error: result,
        });
      } else {
        res.status(code).cookie('email', email, { ...COOKIES_OPTIONS }).json({
          message: 'Success',
          data: result,
        });
      }
    } catch (e) {
      console.error({ service: 'AuthController.checkAvailabilityEmail', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async verifyActivationCode(req: Request, res: Response) {
    const email: string = req.cookies.email;
    const activationCode: string = req.body.activationCode;
    try {
      if (!email) throw Error('Email or Password is empty');
      else if (!activationCode) throw Error('Activation Code is empty');

      const { result, code } = await AuthService.verifyActivationCode(email, activationCode);

      if (code !== 200) {
        res.status(code).json({
          message: 'Error',
          error: result,
        });
      } else {
        res.status(code).cookie('email', email, { ...COOKIES_OPTIONS }).json({
          message: 'Success',
          data: result,
        });
      }
    } catch (e) {
      console.error({ service: 'AuthController.verifyActivationCode', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async resendActivationCode(req: Request, res: Response) {
    const email: string = req.cookies.email;
    try {
      if (!email) throw Error('Email is empty');
      const { result, code } = await AuthService.resendActivationCode(email);

      if (code !== 200) {
        res.status(code).json({
          message: 'Error',
          error: result,
        });
      } else {
        res.status(code).json({
          message: 'Success',
          data: result,
        });
      }
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

      res.status(200).json({
        message: 'Success',
        encrypted: encrypt,
      });
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

      res.status(200).json({
        message: 'Success',
        decrypted: decrypt,
      });
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
