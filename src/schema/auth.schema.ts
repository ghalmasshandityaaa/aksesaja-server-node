import Joi from 'joi';
import { SignIn, SignUp, VerifyActivationCode } from '../interfaces/auth.interface';
import { ResponseErrorValidation } from '../helpers/response.helper';

export const SignInSchema = async (params: SignIn) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.base': 'Email harus berupa string!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
    }),
    password: Joi.string().min(8).max(16).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.base': 'Password harus berupa string!',
      'string.min': 'Password minimal 8 karakter!',
      'string.max': 'Password maksimal 16 karakter!',
      'any.required': 'Password tidak boleh kosong!',
    }),
  });

  await checkValidate(schema, params);
};
export const SignUpSchema = async (params: SignUp) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.base': 'Email harus berupa string!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
    }),
    fullName: Joi.string().required(),
    password: Joi.string().min(8).max(16).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.base': 'Password harus berupa string!',
      'string.min': 'Password minimal 8 karakter!',
      'string.max': 'Password maksimal 16 karakter!',
      'any.required': 'Password tidak boleh kosong!',
    }),
  });

  await checkValidate(schema, params);
};

export const EmailSchema = async (email: string) => {
  const schema = Joi.string().email().required().messages({
    'string.empty': 'Email tidak boleh kosong!',
    'string.base': 'Email harus berupa string!',
    'string.email': 'Email tidak valid!',
    'any.required': 'Email tidak boleh kosong!',
  });

  await checkValidate(schema, email);
};

export const VerifyActivationCodeSchema = async (params: VerifyActivationCode) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.base': 'Email harus berupa string!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
    }),
    verificationCode: Joi.string()
      .regex(/^[0-9]{6}$/)
      .required()
      .messages({
        'string.empty': 'Verification Code tidak boleh kosong!',
        'string.pattern.base': 'Verification Code harus 6 digit!',
        'any.required': 'Verification Code tidak boleh kosong!',
      }),
  });

  await checkValidate(schema, params);
};

const checkValidate = async (schema: any, params: any) => {
  try {
    await schema.validateAsync(params, { abortEarly: false });
  } catch (e) {
    await ResponseErrorValidation(e);
  }
};
