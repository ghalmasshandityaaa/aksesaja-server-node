import { ResponseErrorValidation } from '../helpers/response.helper';

export const checkValidate = async (schema: any, params: any) => {
  try {
    await schema.validateAsync(params, { abortEarly: false, allowUnknown: true, stripUnknown: true });
  } catch (e) {
    await ResponseErrorValidation(e);
  }
};
