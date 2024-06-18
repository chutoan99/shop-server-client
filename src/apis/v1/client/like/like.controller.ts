import { Response } from 'express'
import LikeService from './like.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class LikeController {
	private readonly _likeService: LikeService
	constructor() {
		this._likeService = new LikeService()
	}

	public FindAll = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.userid

			const response = await this._likeService.FindAll(userid)

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
			const response = await this._likeService.Create(
				req.body,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Delete = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const response = await this._likeService.Delete(req.params.id)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new LikeController()
