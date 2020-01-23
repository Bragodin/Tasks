const validation = (schema) => {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (e){
            res.status(400).send({error: e.message});
        }
    }
}

module.exports = validation;

