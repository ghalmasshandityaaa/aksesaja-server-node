import Joi from 'joi';
import { SignIn, SignUp, VerifyActivationCode } from '~/interfaces/auth.interface';

export const SignInSchema = async (params: SignIn) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
  });

  await validate(schema, params, 'SignInSchema');
}
export const SignUpSchema = async (params: SignUp) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id', 'co.id', 'ac.id'] } }).required(),
    fullName: Joi.string().required(),
    password: Joi.string().min(8).max(16).required(),
  });

  await validate(schema, params, 'SignUpSchema');
}

export const EmailSchema = async (email: string) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id', 'co.id', 'ac.id'] } }).required(),
  });

  await validate(schema, email, 'EmailSchema');
}

export const VerifyActivationCodeSchema = async (params: VerifyActivationCode) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id', 'co.id', 'ac.id'] } }).required(),
    verificationCode: Joi.number().min(8).max(8).positive().required(),
  });

  await validate(schema, params, 'VerifyActivationCodeSchema');
}

const validate = async (schema: any, params: any, func: string) => {
  try {
    await schema.validateAsync(params);
  } catch (e) {
    console.error({ service: `AuthSchema.${func}`, message: e.message, stack: e.stack });
    throw e;
  }
}