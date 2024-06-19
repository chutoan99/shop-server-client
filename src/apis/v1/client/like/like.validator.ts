import Joi from 'joi'
import { CreateLikeDto } from './like.dto'

export class LikeValidator {
	public create(payload: CreateLikeDto) {
		const schema = Joi.object({
			itemid: Joi.number().required(),
			shopid: Joi.number().required()
		})
		return schema.validate(payload)
	}
}
