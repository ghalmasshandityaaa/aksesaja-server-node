import { Pagination, PaginationOptions } from './pagination.helper';
import { COOKIES_OPTIONS } from '../constants/auth.constant';

export const responsePage = (results: any[], total: number, paginationOptions: PaginationOptions) => {
  return new Pagination(results, total, paginationOptions);
};

export const responseError = (message: string, error: string) => {
  return { message, error };
};

export const ResponseSuccess = (res: any, code: number, result: any, cookies?: any) => {
  const SUCCESS_CODE = [200, 201, 204];

  if (SUCCESS_CODE.includes(code)) {
    if (cookies.length) {
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
