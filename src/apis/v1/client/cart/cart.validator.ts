import Joi from 'joi'
import { CreateCartDto, UpdateCartDto } from './cart.dto'

export class CartValidator {
	public Create(payload: CreateCartDto) {
		const schema = Joi.object({
      shopid: Joi.number().required(),
      amount: Joi.number().required(),
      itemid: Joi.number().required(),
      tierVariation: Joi.optional(),
      item_option: Joi.optional(),
		})

		return schema.validate(payload)
	}

	public Update(payload: UpdateCartDto) {
		const schema = Joi.object({
      amount: Joi.number().required(),
      item_option: Joi.required()
		})

		return schema.validate(payload)
	}

}
