const schema = require('./user_validation_scheme');

const validation = (schema) => {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (e){
            console.log(e);
        }
    }
}

module.exports = { validation, schema };