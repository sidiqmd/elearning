import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('E-Learning'),
  STAGE: Joi.string().required(),
  PORT: Joi.number().default(3000),
  APP_GLOBAL_PREFIX: Joi.string().required(),

  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),

  MONGODB_URI: Joi.string().required(),
});
