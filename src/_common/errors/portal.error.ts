import { HttpStatus } from '@nestjs/common';

export const PortalError = {
  COMMON: {
    INVALID: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.COMMON.INVALID',
      message: 'Opps unable to process.',
    },
  },

  JWT: {
    EXPIRED: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.JWT.EXPIRED',
      message: 'Token has expired.',
    },
    INVALID: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.JWT.INVALID',
      message: 'Invalid token signature.',
    },
  },

  USER: {
    NOT_FOUND: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.USER.NOT_FOUND',
      message: 'User not found.',
    },
    USERNAME_EXIST: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.USER.USERNAME_EXIST',
      message: 'Username already exist.',
    },
  },

  LOGIN: {
    INVALID_CREDENTIALS: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.LOGIN.INVALID_CREDENTIALS',
      message: 'Invalid credentials.',
    },
    INVALID_OTP: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'PORTAL.LOGIN.INVALID_OTP',
      message: 'Invalid OTP or expired OTP.',
    },
    INVALID_ACCESS_TOKEN: {
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'PORTAL.LOGIN.INVALID_ACCESS_TOKEN',
      message: 'Invalid access token.',
    },
  },
};
