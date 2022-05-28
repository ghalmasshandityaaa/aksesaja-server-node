import { Pagination, PaginationOptions } from './pagination.helper';

export class Response {
  message: string;
  data: any;
  statusCode: number;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export const response = (message: string, data: any) => {
  new Response(message, data);
};

export const responsePage = (results: any[], total: number, paginationOptions: PaginationOptions) => {
  return new Pagination(results, total, paginationOptions);
};

export const responseError = (message: string, error: string) => {
  return { message, error };
};
