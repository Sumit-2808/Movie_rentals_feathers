import Joi from 'joi'
const attrs = {
  name: Joi.string().min(3).max(50)
}

export const genreSchema = Joi.object(attrs)
