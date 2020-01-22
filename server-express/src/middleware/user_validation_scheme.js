const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z]{0,}$')),
    surname: Joi.string()
        .pattern(new RegExp('^[a-zA-Z]{0,}$')),
    password: Joi.string(),
    login: Joi.string(),
    phone: Joi.string()
});

module.exports = schema;