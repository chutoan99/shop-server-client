import { Response } from 'express'
import OrderService from './order.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import OrderQueries from './order.queries'
import { CreateOrderDto } from './order.dto'
class OrderController {
	private readonly _orderService: OrderService
	constructor() {
		this._orderService = new OrderService()
	}

	public Search = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const queries = new OrderQueries(req)
			const response = await this._orderService.Search(
				req.user.userid,
				queries
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}

	public GetOne = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const response = await this._orderService.Find(+req.params.orderid)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}

	public Create = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const payload: CreateOrderDto[] = req.body

			const response = await this._orderService.create(
				payload,
				+req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}
}

export default new OrderController()
