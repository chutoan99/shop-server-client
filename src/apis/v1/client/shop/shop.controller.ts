import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import ShopService from './shop.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class ShopController {
	private readonly _shopService: ShopService
  
	constructor() {
		this._shopService = new ShopService()
	}

	public FindItems = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const shopid: number = +req.params.shopid
			const response = await this._shopService.FindItems(shopid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}

	public Find = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const shopid: number = +req.params.shopid
			const response = await this._shopService.Find(shopid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}
}

export default new ShopController()
