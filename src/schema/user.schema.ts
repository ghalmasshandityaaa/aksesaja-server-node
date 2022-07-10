import Joi from 'joi';
import { ResponseErrorValidation } from '../helpers/response.helper';
import { Auth } from '../interfaces/auth.interface';

export const userDataSchema = async (params: Auth) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      'string.empty': 'userId tidak boleh kosong!',
      'string.base': 'userId harus berupa string!',
      'any.required': 'userId tidak boleh kosong!',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.base': 'Email harus berupa string!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
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
