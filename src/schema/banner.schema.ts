import Joi from 'joi';
import { UploadBanner } from '../interfaces/banner.interface';
import { ResponseErrorValidation } from '../helpers/response.helper';

export const uploadBannerSchema = async (params: UploadBanner) => {
  const schema = Joi.object({
    bannerName: Joi.string().max(50).required().messages({
      'string.base': 'bannerName harus berupa string!',
      'string.max': 'bannerName maksimal 50 karakter!',
      'any.required': 'bannerName tidak boleh kosong!',
      'string.empty': 'bannerName tidak boleh kosong!',
    }),
    position: Joi.string().valid('HOMEPAGE', 'EVENT').required().messages({
      'string.base': 'position harus berupa string!',
      'string.valid': 'position Tidak valid!',
      'any.required': 'position tidak boleh kosong!',
      'string.empty': 'position tidak boleh kosong!',
    }),
    fileAddress: Joi.string().required().messages({
      'string.base': 'Subject harus berupa string!',
      'any.required': 'Subject tidak boleh kosong!',
      'string.empty': 'Subject tidak boleh kosong!',
    }),
    urlLink: Joi.string().required().messages({
      'string.base': 'urlLink harus berupa string!',
      'any.required': 'urlLink tidak boleh kosong!',
      'string.empty': 'urlLink tidak boleh kosong!',
    }),
    startDate: Joi.date().required().messages({
      'string.base': 'startDate harus berupa Tanggal!',
      'any.required': 'startDate tidak boleh kosong!',
      'string.empty': 'startDate tidak boleh kosong!',
    }),
    endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
      'string.base': 'endDate harus berupa Tanggal!',
      'string.greater': 'endDate Harus lebih dari startDate!',
      'any.required': 'endDate tidak boleh kosong!',
      'string.empty': 'endDate tidak boleh kosong!',
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
