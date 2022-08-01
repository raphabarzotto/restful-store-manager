// source https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk
const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
    .min(5)
    .required()
    .messages({
      'any.required': '400|"name" is required',
      'string.min': '422|"name" length must be at least 5 characters long',
    }),
});