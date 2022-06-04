import { Response, Request } from 'express';

/**
 * Where to import Services
 */
import { AuthService } from '../services/auth.service';

/**
 * Where to import Helpers
 */
// const responseHelper = require('../helpers/response.helper');

/**
 * Where to import Interfaces
 */
import { SignIn, SignUp, VerifyActivationCode } from '~/interfaces/auth.interface';
import { textDecrypt, textEncrypt } from '../helpers/helper';

/**
 * Where to import Schema
 */
// const ProductSchema = require('../schema/product.schema');

export class AuthController {
  constructor() { }

  static async signIn(req: Request, res: Response) {
    const params: SignIn = req.body;
    try {
      if (!params.email || !params.password) throw Error('Email or Password is empty');
      const { result, code } = await AuthService.signIn(params);

      if (code === 200) {
        res.status(code).cookie('loginData', result).json({
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
    try {
      if (!params.email) throw Error('Email or Password is empty');
      const { result, code } = await AuthService.signUp(params);

      if (code !== 201) {
        res.status(code).json({
          message: 'Error',
          error: result,
        });
      } else {
        res.status(code).cookie('email-from-cookie', params.email).json({
          message: 'Success',
          data: result,
        });
      }
    } catch (e) {
      console.error({ service: 'AuthController.signUp', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async verifyActivationCode(req: Request, res: Response) {
    const params: VerifyActivationCode = req.body;
    try {
      if (!params.email) throw Error('Email or Password is empty');
      else if (!params.activationCode) throw Error('Activation Code is empty');

      const { result, code } = await AuthService.verifyActivationCode(params);

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
      console.error({ service: 'AuthController.verifyActivationCode', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async encrypt(req: Request, res: Response) {
    const params: { text: string } = req.body;
    try {

      const encrypt = textEncrypt(params.text);

      res.status(200).json({
        message: 'Success',
        encrypted: encrypt,
      })
    } catch (e) {
      console.error({ service: 'AuthController.encrypt', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }

  static async decrypt(req: Request, res: Response) {
    const params: { text: string } = req.body;
    try {

      const decrypt = textDecrypt(params.text);

      res.status(200).json({
        message: 'Success',
        decrypted: decrypt,
      })
    } catch (e) {
      console.error({ service: 'AuthController.decrypt', message: e.message, stack: e.stack });
      res.status(400).json({ message: 'Error', error: e.message });
    }
  }
}
