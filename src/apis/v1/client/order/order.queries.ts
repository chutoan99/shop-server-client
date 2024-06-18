import { Request } from 'express'

export default class OrderQueries {
	type?: number | null
	shop_name: string

	constructor(req: Request) {
		this.shop_name = req.query?.shop_name
			? req.query.shop_name.toString()
			: ''

		this.type = req.query?.type ? +req.query?.type : null
	}
}
