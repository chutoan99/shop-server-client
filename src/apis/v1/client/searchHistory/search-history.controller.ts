import { Response } from 'express'
import { badRequest, internalServerError } from '~/@core/systems/handle_errors'
import SearchHistoryService from './search-history.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { CreateSearchHistoryDto } from './search-history.dto'
import { SearchHistoryValidator } from './search-history.validator'
class SearchHistoryController {
	private readonly _searchHistoryService: SearchHistoryService
	private readonly _searchHistoryValidator: SearchHistoryValidator
	constructor() {
		this._searchHistoryValidator = new SearchHistoryValidator()
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

      const payload: CreateSearchHistoryDto = req.body
			const { error } = this._searchHistoryValidator.create(payload)
			if (error) return badRequest(error.details[0]?.message, res)
			const response = await this._searchHistoryService.Create(
				payload,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new SearchHistoryController()
