import Joi from 'joi'
import { UpdateUserDto } from './user.dto'

export class UserValidator {
	public update(payload: UpdateUserDto) {
		const schema = Joi.object({
			email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
			name: Joi.string().required(),
			sex: Joi.number().required(),
			address: Joi.string().required(),
			birthday: Joi.date().required(),
			phone: Joi.number().required(),
      filename: Joi.string().required(),
			avatar: Joi.string().required(),
		})
		return schema.validate(payload)
	}
}
