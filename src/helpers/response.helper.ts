import { Pagination, PaginationOptions } from './pagination.helper';
import { COOKIES_OPTIONS } from '../constants/auth.constant';

export const responsePage = (results: any[], total: number, paginationOptions: PaginationOptions) => {
  return new Pagination(results, total, paginationOptions);
};

export const responseError = (message: string, error: string) => {
  return { message, error };
};

export const ResponseSuccess = (res: any, code: number, result: any = null, cookies?: any) => {
  const SUCCESS_CODE = [200, 201, 204];

  if (SUCCESS_CODE.includes(code)) {
    if (cookies && cookies.length) {
      for (let i = 0; i < cookies.length; i++) {
        res.cookie(cookies[i].name, cookies[i].value, COOKIES_OPTIONS);
      }
    }
    res.status(code).json({
      message: 'Success',
      data: result,
    });
  } else {
    res.status(code).json({
      message: 'Error',
      error: result,
    });
  }
};

export const ResponseError = (res: any, code: number, error: any) => {
  let data: any = {
    message: 'Error',
    error: error.message,
  };
  if (error.validationError && error.validationError !== undefined) {
    data = {
      message: 'Error Validation',
      error: error.message.message,
      details: error.message.details,
    };
  }
  res.status(code).json(data);
};

export const ResponseErrorValidation = async (error: any) => {
  throw {
    message: {
      message: error.message,
      details: error.details.map((data: any) => {
        data.path = data.path.toString();
        data['value'] = data.context ? (data.context.value ? data.context.value : null) : null;
        delete data.type;
        delete data.context;
        return data;
      }),
    },
    stack: error.stack,
    validationError: true,
  };
};
