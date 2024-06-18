import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import ShopMallService from './shop-mall.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class ShopMallController {
	private readonly _shopMallService: ShopMallService
  
	constructor() {
		this._shopMallService = new ShopMallService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._shopMallService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new ShopMallController()
