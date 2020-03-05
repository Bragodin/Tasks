const Joi = require('@hapi/joi');
const userSchema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9А-Яа-я ]{3,30}$')),
    surname: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9А-Яа-я ]{3,30}$')),
    login: Joi.string()
        .pattern(new RegExp('^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$')),
    password: Joi.string()
        .pattern(new RegExp('^[A-Za-z0-9]{6,}')),
        // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}')),
    avatar: Joi.string(),
    phone: Joi.string()
        .pattern(new RegExp('^(375(29|33|25|44)|\\+375\\s\\((29|33|25|44)\\)\\s|8\\s\\(0(29|33|25|44)\\)\\s)[1-9]{1}([0-9]{6}|[0-9]{2}-[0-9]{2}-[0-9]{2})$'))
});

module.exports = userSchema;


