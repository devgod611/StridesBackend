const Joi = require('@hapi/joi');

//Validation schema for the request body

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
}

const loginValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .required()
            .email(),
        password: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
}

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;