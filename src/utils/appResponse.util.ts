import { StatusCodes } from 'http-status-codes';

export enum AppResponseStatusEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  TOKEN_UPDATED = 'TOKEN_UPDATED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  OTP_SENT = 'OTP_SENT',
}

export class AppResponse<T = any> {
  statusCode: number;
  status: AppResponseStatusEnum;
  message: string;
  data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('2')
      ? AppResponseStatusEnum.SUCCESS
      : AppResponseStatusEnum.ERROR;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data?: T) {
    return new AppResponse<T>(message, StatusCodes.OK, data);
  }

  static created<T>(message: string, data?: T) {
    return new AppResponse<T>(message, StatusCodes.CREATED, data);
  }

  static updated<T>(message: string, data?: T) {
    return new AppResponse<T>(message, StatusCodes.OK, data);
  }

  static noContent<T>(message: string) {
    return new AppResponse<T>(message, StatusCodes.NO_CONTENT);
  }

  static removed<T>(message: string, data?: T) {
    return new AppResponse<T>(message, StatusCodes.NO_CONTENT, data);
  }
}
