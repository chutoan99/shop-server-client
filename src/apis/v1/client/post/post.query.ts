import { Request } from 'express'

export default class PostQuery {
	page: number = 0
	limit: number = 0
	name: string = ''

	constructor(req: Request) {
		this.page = req.query.page ? +req.query.page : 0
		this.limit = req.query.limit ? +req.query.limit : 0
		this.name = req.query?.name ? req.query.name?.toString() : ''
	}
}
