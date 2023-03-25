import Joi from 'joi'
const attrs = {
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(5).max(1024).required(),
  isAdmin: Joi.boolean()
}

export const userSchema = Joi.object(attrs)
