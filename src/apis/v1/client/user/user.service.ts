import { LoggerSystem } from '~/systems/logger'
import MESSAGE from '~/@core/contains/message.json'
import UserRepository from './user.repository'
import User from './user.entity'
import CloudSystem from '~/systems/cloudinary/cloud.system'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import UserResponse from './user.inteface'
import { WriteResponse } from '~/systems/other/response.system'
export default class UserService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _userRepository: UserRepository
	private readonly _cloudSystem: CloudSystem
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._userRepository = new UserRepository()
		this._cloudSystem = new CloudSystem()
	}

	public FindUser = async (userid: number): Promise<UserResponse> => {
		try {
			const currentUser: User = await this._userRepository.currentUser(
				userid
			)

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: currentUser
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public UpdateUser = async (
		userid: number,
		payload: User
	): Promise<WriteResponse> => {
		try {
			const currentUser: User = await this._userRepository.currentUser(
				userid
			)

			if (!currentUser) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const newUser: User = Builder<User>()
				.id(userid)
				.sex(+payload?.sex)
				.email(payload?.email)
				.name(payload?.name)
				.filename(payload?.filename)
				.address(payload?.address)
				.phone(+payload?.phone)
				.birthday(payload?.birthday)
				.avatar(payload?.avatar)
				.build()

			const idUpdated: boolean = await this._userRepository.updateUser(
				newUser
			)

			if (idUpdated) {
				this._cloudSystem.deleteFile(currentUser.filename)
				return {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.UPDATE.FAIL
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public checkExistUser = async (email: string) => {
		const existingUser: User = await this._userRepository.findUser(email)
		if (existingUser) {
			return {
				err: 1,
				msg: MESSAGE.EMAIL.IS_ALREADY
			}
		}
	}
}
