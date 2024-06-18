import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import NotifyService from './notify.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class NotifyController {
	private readonly _notifyService: NotifyService
	constructor() {
		this._notifyService = new NotifyService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._notifyService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new NotifyController()
