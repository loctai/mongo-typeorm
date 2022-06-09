import { celebrate, Joi } from 'celebrate';

export const createUserValidator = celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      gender: Joi.string().required(),
      birthdate: Joi.string().required(),
      phone: Joi.string().required(),
    }),
});
