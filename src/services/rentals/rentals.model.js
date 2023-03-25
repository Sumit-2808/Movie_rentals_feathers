import Joi from "joi";
const attrs={
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
}

export const rentalSchema=Joi.object(attrs)