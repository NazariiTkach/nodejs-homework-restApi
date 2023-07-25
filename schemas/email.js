const Joi = require("joi");

const emailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailValid).required(),
});

module.exports = emailSchema;