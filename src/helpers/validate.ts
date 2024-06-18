import Joi from 'joi'

const email: Joi.StringSchema<string> = Joi.string()
	.pattern(new RegExp('gmail.com$'))
	.required()

const password: Joi.StringSchema<string> = Joi.string().min(6).required()
const image: Joi.StringSchema<string> = Joi.string().required()
const images: Joi.ArraySchema<any[]> = Joi.array().items(
	Joi.string().required()
)
const itemName: Joi.StringSchema<string> = Joi.string().required()
const token: Joi.StringSchema<string> = Joi.string().required()
const price: Joi.NumberSchema<number> = Joi.number().required()

export { email, password, image, itemName as name, price, token, images }
