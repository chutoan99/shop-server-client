import { Request, Response } from 'express'
import { internalServerError } from '~/@core/systems/handle_errors'
import IndustryService from './industry.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import IndustryQuery from './industry.query'
class IndustryController {
	private readonly _industryService: IndustryService
	constructor() {
		this._industryService = new IndustryService()
	}
	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._industryService.FindAll()

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Search = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const queries = new IndustryQuery(req)
			const response = await this._industryService.Search(queries)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new IndustryController()
