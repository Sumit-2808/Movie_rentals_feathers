import Joi from "joi";
const attrs={
    title: Joi.string().min(3).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    genreId: Joi.string().required(),
    liked: Joi.boolean(),
}

export const movieSchema=Joi.object(attrs)