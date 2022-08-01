// source https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk
const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi
    .required()
    .number()
    .integer()
    .positive()
    .strict()
    .messages({
      'any.required': '400|"productId" is required',
    }),
  quantity: Joi
    .required()
    .number()
    .integer()
    .positive()
    .strict()
    .messages({
      'any.required': '400|"quantity" is required',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
    }),
});