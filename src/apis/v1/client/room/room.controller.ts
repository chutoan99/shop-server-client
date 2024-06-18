import { Response } from 'express'
import RoomService from './room.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
class RoomController {
	private readonly _roomService: RoomService
	constructor() {
		this._roomService = new RoomService()
	}

	public FindAll = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const userid: number = +req.user.userid
			const response = await this._roomService.FindAll(userid)

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
			const response = await this._roomService.Create(
				req.body,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new RoomController()
