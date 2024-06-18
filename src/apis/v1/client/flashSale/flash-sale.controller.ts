import { Request, Response } from 'express'
import FlashSaleService from './flash-sale.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class FlashSaleController {
	private readonly _flashSaleService: FlashSaleService
	constructor() {
		this._flashSaleService = new FlashSaleService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._flashSaleService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new FlashSaleController()
