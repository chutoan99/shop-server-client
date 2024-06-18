import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import TopProductService from './top-product.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class TopProductController {
	private readonly _topProductService: TopProductService
	constructor() {
		this._topProductService = new TopProductService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._topProductService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new TopProductController()
