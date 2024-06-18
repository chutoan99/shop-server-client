import { Request } from 'express'

export default class IndustryQuery {
	page: number = 0
	limit: number = 0
	category_name: string = ''

	constructor(req: Request) {
		this.page = req.query.page ? +req.query.page : 0
		this.limit = req.query.limit ? +req.query.limit : 0
		this.category_name = req.query?.category_name
			? req.query.category_name?.toString()
			: ''
	}
}
