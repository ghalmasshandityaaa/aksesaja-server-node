import Joi from 'joi';
import { ResponseErrorValidation } from '../helpers/response.helper';
import { SendFeedback } from '../interfaces/feedback.interface';

export const sendFeedbackSchema = async (params: SendFeedback) => {
  const schema = Joi.object({
    email: Joi.string().email().optional().messages({
      'string.base': 'email harus berupa string!',
      'string.email': 'email tidak valid!',
    }),
    fullName: Joi.string().max(15).optional().messages({
      'string.base': 'Email harus berupa string!',
      'string.max': 'Email maksimal 15 karakter!',
    }),
    subject: Joi.string().max(50).required().messages({
      'string.base': 'Subject harus berupa string!',
      'string.max': 'Subject maksimal 50 karakter!',
      'any.required': 'Subject tidak boleh kosong!',
      'string.empty': 'Subject tidak boleh kosong!',
    }),
    description: Joi.string().max(500).required().messages({
      'string.base': 'Description harus berupa string!',
      'string.max': 'Description maksimal 500 karakter!',
      'any.required': 'Description tidak boleh kosong!',
      'string.empty': 'Description tidak boleh kosong!',
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
