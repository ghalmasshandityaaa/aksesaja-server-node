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
    res.status(code)
      .json({
        message: 'Success',
        data: result,
      });
    if (cookies) res.cookie(cookies.name, cookies.value, { ...COOKIES_OPTIONS });
    res.end();
  } else {
    res.status(code)
      .json({
        message: 'Error',
        error: result,
      });
  }
}
