import { Response } from 'express'
import RoomService from './room.service'
import { badRequest, internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { CreateRoomDto } from './room.dto'
import { RoomValidator } from './room.validator'
class RoomController {
	private readonly _roomService: RoomService
	private readonly _roomValidator: RoomValidator
	constructor() {
		this._roomValidator = new RoomValidator()
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
      const payload: CreateRoomDto = req.body
			const { error } = this._roomValidator.create(payload)
			if (error) return badRequest(error.details[0]?.message, res)
        
			const response = await this._roomService.Create(
        payload,
				req.user.userid
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new RoomController()
