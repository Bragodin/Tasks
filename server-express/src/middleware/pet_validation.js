const Joi = require('@hapi/joi');
const petSchema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),
    ownerId: Joi.string()
        .min(20)
});

module.exports = petSchema;


