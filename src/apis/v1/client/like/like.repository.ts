import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import Like from './like.entity'
import { LoggerSystem } from '~/systems/logger'
interface ILikeRepository {
	findAll(userid: number): Promise<Like[]>
	find(id: number): Promise<Like>
	create(payload: Like, userid: number): Promise<boolean>
	delete(id: number): Promise<boolean>
}

export default class LikeRepository implements ILikeRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (userid: number): Promise<Like[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, userid, itemid, shopid, createdAt, updatedAt FROM Likes WHERE userid = ${userid}`
			)

			return response as Like[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (id: number): Promise<Like> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT * from Likes WHERE id = ${id}`
			)
			return (response as Like[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (like: Like): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`INSERT INTO Likes (id, userid, itemid, shopid) VALUES (?, ?, ?, ?)`,
					[like.id, like.userid, like.itemid, like.shopid]
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public delete = async (id: number): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`DELETE FROM Likes WHERE id = ${id}`
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
