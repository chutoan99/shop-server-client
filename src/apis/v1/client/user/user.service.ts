import { LoggerSystem } from '~/systems/logger'
import MESSAGE from '~/@core/contains/message.json'
import UserRepository from './user.repository'
import CloudSystem from '~/systems/cloudinary/cloud.system'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import UserResponse from './user.response'
import { BaseResponse } from '~/systems/other/response.system'
import { UserModel } from './user.model'
import { UpdateUserDto } from './user.dto'
export default class UserService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _userRepository: UserRepository
	private readonly _cloudSystem: CloudSystem

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._userRepository = new UserRepository()
		this._cloudSystem = new CloudSystem()
	}

	public FindUser = async (id: number): Promise<UserResponse> => {
		try {
			const currentUser: UserModel = await this._userRepository.current(
				id
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
		id: number,
		payload: UpdateUserDto
	): Promise<BaseResponse> => {
		try {
			const currentUser: UserModel = await this._userRepository.current(
				id
			)

			if (!currentUser) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const newUser: UserModel = Builder<UserModel>()
				.id(id)
				.sex(+payload?.sex)
				.email(payload?.email)
				.name(payload?.name)
				.filename(payload?.filename)
				.address(payload?.address)
				.phone(+payload?.phone)
				.birthday(payload?.birthday)
				.avatar(payload?.avatar)
				.build()

			const idUpdated: boolean = await this._userRepository.update(
				newUser
			)

			if (!idUpdated) {
				return {
					err: 1,
					msg: MESSAGE.UPDATE.FAIL
				}
			}

			this._cloudSystem.deleteFile(currentUser.filename)
			return {
				err: 0,
				msg: MESSAGE.UPDATE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public checkExistUser = async (email: string) => {
		const existingUser: UserModel = await this._userRepository.findByEmail(
			email
		)
		if (existingUser) {
			return {
				err: 1,
				msg: MESSAGE.EMAIL.IS_ALREADY
			}
		}
	}
}
