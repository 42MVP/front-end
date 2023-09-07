import { AxiosError, isAxiosError } from 'axios';

interface ApiErrorType {
  statusCode: number;
  message: string;
  error: string;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export const triggerApiError = (error: unknown): never => {
  if (isAxiosError(error)) {
    const response = (error as AxiosError<ApiErrorType>).response;
    const data = response?.data;
    if (data && data.message) throw new ApiError(response.status, data.message);
  }
  throw error;
};
