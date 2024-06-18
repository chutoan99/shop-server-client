import { Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import SearchHistoryService from './search-history.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class SearchHistoryController {
	private readonly _searchHistoryService: SearchHistoryService
	constructor() {
		this._searchHistoryService = new SearchHistoryService()
	}

	public FindAll = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.userid
			const response = await this._searchHistoryService.FindAll(userid)

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
			const response = await this._searchHistoryService.Create(
				req.body,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new SearchHistoryController()
