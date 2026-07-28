export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiErrorDetail = {
  path: string | number;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorDetails?: ApiErrorDetail[];
};
