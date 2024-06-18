import { LoggerSystem } from '~/systems/logger'
import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import User from './user.entity'

interface IUserRepository {
	findUser(email: string): Promise<User>
	currentUser(userid: number): Promise<User>
	createUser(user: User): Promise<boolean>
	updateUser(user: User): Promise<boolean>
}

export default class UserRepository implements IUserRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._baseDataBase = new BaseDataBase()
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase.initDb()
	}

	public findUser = async (email: string): Promise<User> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT * FROM Users WHERE email = '${email}'`
			)

			return (response as User[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public currentUser = async (userid: number): Promise<User> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT 
					id, 
					shopid, 
					username, 
					name, 
					email, 
					sex, 
					birthday, 
					phone, 
					address, 
					avatar, 
					filename, 
					role, 
					not_new_user, 
					createdAt,
					updatedAt
				FROM Users WHERE id = ${userid} Limit 1`
			)

			return (response as User[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public createUser = async (user: User): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] = await this
				._baseDataBase.db.execute(`
        INSERT IGNORE INTO Users 
          (id, shopid, name, username, email, sex, role, password) 
        VALUES 
          (${user.id}, ${user.shopid}, '${user.name}', '${user.username}', '${user.email}', ${user.sex}, '${user.role}', '${user.password}')
        `)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public updateUser = async (user: User): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] = await this
				._baseDataBase.db.query(`
            UPDATE Users 
            SET 
              sex = '${user?.sex}',
              email = '${user.email}',
              name = CASE WHEN '${user.name}' = '' THEN NULL ELSE '${user.name}' END,
              address = CASE WHEN '${user.address}' = '' THEN NULL ELSE '${user.address}' END,
              phone = CASE WHEN '${user.phone}' IS NOT NULL THEN '${user.phone}' ELSE NULL END,
              filename = CASE WHEN '${user.filename}' IS NOT NULL THEN '${user.filename}' ELSE NULL END,
              birthday = CASE WHEN '${user.birthday}' = '' THEN NULL ELSE STR_TO_DATE('${user.birthday}', '%Y-%m-%dT%H:%i:%s.000Z') END,
              avatar = CASE WHEN '${user.avatar}' IS NOT NULL THEN '${user.avatar}' ELSE NULL END
            WHERE id = '${user.id}'
      `)

			return response && response?.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
