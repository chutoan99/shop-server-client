import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import SearchSuggestService from './search-suggest.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class SearchSuggestController {
	private readonly _searchSuggestService: SearchSuggestService
	constructor() {
		this._searchSuggestService = new SearchSuggestService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._searchSuggestService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new SearchSuggestController()
