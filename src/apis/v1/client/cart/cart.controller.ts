import { Response } from 'express'
import { badRequest, internalServerError } from '~/@core/systems/handle_errors'
import CartService from './cart.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { CartValidator } from './cart.validator'
import { CreateCartDto, UpdateCartDto } from './cart.dto'
class CartController {
	private readonly _cartService: CartService
	private readonly _cartValidator: CartValidator

	constructor() {
		this._cartService = new CartService()
		this._cartValidator = new CartValidator()
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
			const payload: CreateCartDto = req.body
			const { error } = this._cartValidator.Create(payload)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._cartService.Create(
				payload,
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

			const payload: UpdateCartDto = req.body
			const { error } = this._cartValidator.Update(payload)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._cartService.Update(
				+req.params.cartid,
				payload
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
