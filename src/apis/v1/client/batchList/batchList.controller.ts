import { Request, Response } from 'express'
import BatchListService from './batchList.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class BatchListController {
	private readonly _batchListService: BatchListService
	constructor() {
		this._batchListService = new BatchListService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._batchListService.FindAll()
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new BatchListController()
