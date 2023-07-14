const Joi = require("joi");

const emailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailValid).required(),
  password: Joi.string().min(6).required(),
 
  
});

module.exports = registerSchema;