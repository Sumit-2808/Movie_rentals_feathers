import Joi from 'joi'
const attrs = {
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(10),
  isGold: Joi.boolean()
}

export const customerSchema = Joi.object(attrs)
