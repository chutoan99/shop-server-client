import { Response } from 'express'
import UserService from './user.service'
import { badRequest, internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import CloudSystem from '~/systems/cloudinary/cloud.system'
import { UpdateUserDto } from './user.dto'
import { UserValidator } from './user.validator'
import _ from 'lodash'

class UserController {
	private readonly _userService: UserService
	private readonly _cloudSystem: CloudSystem
	private readonly _userValidator: UserValidator

	constructor() {
		this._userService = new UserService()
		this._cloudSystem = new CloudSystem()
		this._userValidator = new UserValidator()
	}

	public FindUser = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			const userid: number = req.user.userid

			const response = await this._userService.FindUser(userid)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}

	public UpdateCurrent = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		const fileData = req.file
		const payload: UpdateUserDto = req.body
		try {
			if (!_.isEmpty(fileData)) {
				payload.avatar = fileData.path
				payload.filename = fileData.filename
			}

			const { error } = this._userValidator.update(payload)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._userService.UpdateUser(
				req.user.userid,
				payload
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			if (fileData) this._cloudSystem.deleteFile(fileData.filename)
			internalServerError(res)
		}
	}
}

export default new UserController()
