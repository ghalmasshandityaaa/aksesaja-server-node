import Joi from 'joi';
import { RegisterOrganizer, SignIn, UpdateDetailOrganizer, UpdateOrganizer, UpdatePassword } from '../interfaces/organizer.interface';
import { checkValidate } from './index.schema';

export const registerSchema = async (params: RegisterOrganizer) => {
  const schema = Joi.object({
    organizerName: Joi.string().max(50).required().messages({
      'string.base': 'Organizer Name harus berupa string!',
      'string.max': 'Organizer Name maksimal 50 karakter!',
      'any.required': 'Organizer Name tidak boleh kosong!',
      'string.empty': 'Organizer Name tidak boleh kosong!',
    }),
    description: Joi.string().max(255).optional().allow(null).messages({
      'string.base': 'Description harus berupa string!',
      'string.max': 'Description maksimal 255 karakter!',
      'string.empty': 'Description tidak boleh kosong!',
    }),
    address: Joi.string().optional().allow(null).messages({
      'string.base': 'Alamat harus berupa string!',
      'string.empty': 'Alamat tidak boleh kosong!',
    }),
    phone: Joi.string().max(20).required().messages({
      'string.base': 'Phone harus berupa string!',
      'string.max': 'Phone maksimal 20 karakter!',
      'string.empty': 'Phone tidak boleh kosong!',
      'any.required': 'Phone tidak boleh kosong!',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email harus berupa string!',
      'string.empty': 'Email tidak boleh kosong!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
    }),
    detail: Joi.string().optional().allow(null).messages({
      'string.base': 'Detail Organizer harus berupa string!',
    }),
    photo: Joi.string().optional().allow(null).messages({
      'string.base': 'Photo profile harus berupa image!',
      'string.empty': 'Photo profile tidak boleh kosong!',
    }),
    banner: Joi.any().allow(null).optional().messages({
      'string.base': 'Banner harus berupa image!',
      'string.empty': 'Banner tidak boleh kosong!',
    }),
    isLocked: Joi.boolean().required().messages({
      'boolean.base': 'isLocked harus berupa boolean!',
      'boolean.empty': 'isLocked tidak boleh kosong!',
      'any.required': 'isLocked tidak boleh kosong!',
    }),
    password: Joi.when('isLocked', {
      is: true,
      then: Joi.string().required().messages({
        'string.base': 'Password harus berupa string!',
        'string.empty': 'Password tidak boleh kosong!',
        'any.required': 'Password tidak boleh kosong!',
      }),
      otherwise: Joi.string().optional().allow(null).messages({
        'string.base': 'Password harus berupa string!',
        'string.empty': 'Password tidak boleh kosong!',
      }),
    }),
    organizerCategoryId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerCategory Id harus berupa string!',
        'string.empty': 'organizerCategory Id tidak boleh kosong!',
        'any.required': 'organizerCategory Id tidak boleh kosong!',
        'string.guid': 'organizerCategory Id tidak valid!',
      }),
  });

  await checkValidate(schema, params);
};

export const updatePasswordSchema = async (params: UpdatePassword) => {
  const schema = Joi.object({
    organizerId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerId Id harus berupa string!',
        'string.empty': 'organizerId Id tidak boleh kosong!',
        'any.required': 'organizerId Id tidak boleh kosong!',
        'string.guid': 'organizerId Id tidak valid!',
      }),
    oldPassword: Joi.string().required().messages({
      'string.base': 'Old Password harus berupa string!',
      'string.empty': 'Old Password tidak boleh kosong!',
      'any.required': 'Old Password tidak boleh kosong!',
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password harus berupa string!',
      'string.empty': 'Password tidak boleh kosong!',
      'any.required': 'Password tidak boleh kosong!',
    }),
  });

  await checkValidate(schema, params);
};

export const updateOrganizerSchema = async (params: UpdateOrganizer) => {
  const schema = Joi.object({
    organizerId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerId Id harus berupa string!',
        'string.empty': 'organizerId Id tidak boleh kosong!',
        'any.required': 'organizerId Id tidak boleh kosong!',
        'string.guid': 'organizerId Id tidak valid!',
      }),
    organizerName: Joi.string().max(50).required().messages({
      'string.base': 'Organizer Name harus berupa string!',
      'string.max': 'Organizer Name maksimal 50 karakter!',
      'any.required': 'Organizer Name tidak boleh kosong!',
      'string.empty': 'Organizer Name tidak boleh kosong!',
    }),
    description: Joi.string().max(255).optional().allow(null).messages({
      'string.base': 'Description harus berupa string!',
      'string.max': 'Description maksimal 255 karakter!',
      'string.empty': 'Description tidak boleh kosong!',
    }),
    address: Joi.string().optional().allow(null).messages({
      'string.base': 'Alamat harus berupa string!',
      'string.empty': 'Alamat tidak boleh kosong!',
    }),
    phone: Joi.string().max(20).required().messages({
      'string.base': 'Phone harus berupa string!',
      'string.max': 'Phone maksimal 20 karakter!',
      'string.empty': 'Phone tidak boleh kosong!',
      'any.required': 'Phone tidak boleh kosong!',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email harus berupa string!',
      'string.empty': 'Email tidak boleh kosong!',
      'string.email': 'Email tidak valid!',
      'any.required': 'Email tidak boleh kosong!',
    }),
    organizerCategoryId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerCategory Id harus berupa string!',
        'string.empty': 'organizerCategory Id tidak boleh kosong!',
        'any.required': 'organizerCategory Id tidak boleh kosong!',
        'string.guid': 'organizerCategory Id tidak valid!',
      }),
  });

  await checkValidate(schema, params);
};

export const checkOrganizerIdSchema = async (params: { organizerId: string }) => {
  const schema = Joi.object({
    organizerId: Joi.string().required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerId Id harus berupa string!',
        'string.empty': 'organizerId Id tidak boleh kosong!',
        'any.required': 'organizerId Id tidak boleh kosong!',
        'string.guid': 'organizerId Id tidak valid!',
      }),
  });

  await checkValidate(schema, params);
};

export const updateDetailInformationOrganizer = async (params: UpdateDetailOrganizer) => {
  const schema = Joi.object({
    organizerId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerId Id harus berupa string!',
        'string.empty': 'organizerId Id tidak boleh kosong!',
        'any.required': 'organizerId Id tidak boleh kosong!',
        'string.guid': 'organizerId Id tidak valid!',
      }),
    detail: Joi.string().optional().messages({
      'string.base': 'Organizer Name harus berupa string!',
    }),
  });

  await checkValidate(schema, params);
};

export const signInSchema = async (params: SignIn) => {
  const schema = Joi.object({
    organizerId: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      })
      .messages({
        'string.base': 'organizerId Id harus berupa string!',
        'string.empty': 'organizerId Id tidak boleh kosong!',
        'any.required': 'organizerId Id tidak boleh kosong!',
        'string.guid': 'organizerId Id tidak valid!',
      }),
    detail: Joi.string().optional().messages({
      'string.base': 'Organizer Name harus berupa string!',
    }),
  });

  await checkValidate(schema, params);
};
