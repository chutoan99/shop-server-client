import { Request, Response } from 'express'
import CategoriesTreeService from './category-tree.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'

class CategoriesTreeController {
	private readonly _categoriesTreeService: CategoriesTreeService
  
	constructor() {
		this._categoriesTreeService = new CategoriesTreeService()
	}

	public FindAll = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const level: number = +req.params.level
			const response = await this._categoriesTreeService.FindAll(level)
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
			const catid: number = +req.params.catid
			const response = await this._categoriesTreeService.Search(catid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new CategoriesTreeController()
