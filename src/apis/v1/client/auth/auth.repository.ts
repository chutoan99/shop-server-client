import { LoggerSystem } from '~/systems/logger/logger.system'
import { BaseDataBase } from '~/systems/dataBase'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { ResultResponse } from '~/@core/systems/response'
import { UserModel } from '../user/user.model'

interface IAuthRepository {
	updateRefreshToken(user: UserModel, token: string): Promise<boolean>
	updateToken(email: string, token: string, expires: number): Promise<boolean>
	logout(userid: number): Promise<boolean>
	resetPassword(email: string, password: string): Promise<boolean>
	findUserRefreshAccessToken(
		userid: number,
		refreshToken: string
	): Promise<UserModel>
}

export default class AuthRepository implements IAuthRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase

	constructor() {
		this._baseDataBase = new BaseDataBase()
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase.initDb()
	}

	public updateRefreshToken = async (
		user: UserModel,
		token: string
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.query(
					`UPDATE Users SET refreshToken = '${token}', not_new_user = CASE WHEN ${user.not_new_user} IS NULL THEN TRUE ELSE FALSE END WHERE email = '${user?.email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public updateToken = async (
		email: string,
		token: string,
		expires: number
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`UPDATE Users SET passwordResetToken = '${token}', passwordResetExpires = '${expires}' WHERE email = '${email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public logout = async (userid: number): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.query(
					`UPDATE Users SET refreshToken = '' WHERE id = '${userid}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public resetPassword = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.query(
					`UPDATE Users SET password = '${password}', passwordChangedAt = '${Date.now()}' , passwordResetToken = '''' passwordResetExpires = '''',  WHERE email = '${email}'`
				)
			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public findUserRefreshAccessToken = async (
		userid: number,
		refreshToken: string
	): Promise<UserModel> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT * FROM Users WHERE id = '${userid}' AND refreshToken = '${refreshToken}'`
			)
			return (response as UserModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
