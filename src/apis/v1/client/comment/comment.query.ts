import { Request } from 'express'

export default class CommentQuery {
	page: number = 0
	limit: number = 0
	name: string = ''
	itemid?: number = 0
	shopid?: number = 0
	orderid?: number = 0

	constructor(req: Request) {
		this.page = req.query.page ? +req.query.page : 0
		this.limit = req.query.limit ? +req.query.limit : 0
		this.itemid = req.query?.itemid ? +req.query?.itemid : 0
		this.shopid = req.query?.shopid ? +req.query?.shopid : 0
		this.orderid = req.query?.orderid ? +req.query?.orderid : 0
		this.name = req.query?.name ? req.query.name?.toString() : ''
	}
}
