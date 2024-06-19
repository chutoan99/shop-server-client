import Joi from 'joi'
import { CreateSearchHistoryDto } from './search-history.dto'

export class SearchHistoryValidator {
	public create(payload: CreateSearchHistoryDto) {
		const schema = Joi.object({
			text: Joi.string().required()
		})
		return schema.validate(payload)
	}
}
