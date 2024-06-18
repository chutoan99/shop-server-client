import { Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import CartService from './cart.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class CartController {
	private readonly _cartService: CartService
  
	constructor() {
		this._cartService = new CartService()
	}

	public FindAll = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._cartService.FindAll(req.user.userid)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Create = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._cartService.Create(
				req.body,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Update = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._cartService.Update(
				+req.params.cartid,
				req.body
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Delete = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._cartService.Delete(+req.params.cartid)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new CartController()
