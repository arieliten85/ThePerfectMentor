
const Joi = require('joi');

const SchemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    age:Joi.string(),
    rol: Joi.string().required(),
    image: Joi.string()
})

module.exports = SchemaRegister;

 