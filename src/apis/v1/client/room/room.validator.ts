import Joi from 'joi'
import { CreateRoomDto } from './room.dto'

export class RoomValidator {
	public create(payload: CreateRoomDto) {
		const schema = Joi.object({
			shopid: Joi.number().required()
		})
		return schema.validate(payload)
	}
}
