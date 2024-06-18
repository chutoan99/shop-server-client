import { Response } from 'express'
import UserService from './user.service'
import { badRequest, internalServerError } from '~/@core/systems/handle_errors'
import User from './user.entity'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import CloudSystem from '~/systems/cloudinary/cloud.system'

class UserController {
	private readonly _userService: UserService
	private readonly _cloudSystem: CloudSystem
	constructor() {
		this._userService = new UserService()
		this._cloudSystem = new CloudSystem()
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
		const user: User = req.body
		try {
			if (fileData) {
				const { error } = this._cloudSystem.validateImage(req.file)
				if (error) {
					return badRequest(error.details[0].message, res)
				} else {
					user.avatar = fileData.path
					user.filename = fileData.filename
				}
			}
			const response = await this._userService.UpdateUser(
				req.user.userid,
				user
			)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			if (fileData) this._cloudSystem.deleteFile(fileData.filename)
			internalServerError(res)
		}
	}
}

export default new UserController()
