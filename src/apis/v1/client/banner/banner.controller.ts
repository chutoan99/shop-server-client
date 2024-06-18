import { Request, Response } from 'express'
import BannerService from './banner.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { BannerResponse } from './banner.interface'

class BannerController {
	private readonly _bannerService: BannerService
  
	constructor() {
		this._bannerService = new BannerService()
	}

	public FindAll = async (
		_req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response: BannerResponse = await this._bannerService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new BannerController()
