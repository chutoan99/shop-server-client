import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { LoggerSystem } from '~/systems/logger'
import { LikeModel } from './like.model'
interface ILikeRepository {
	findAll(userId: number): Promise<LikeModel[]>
	find(id: number): Promise<LikeModel>
	create(payload: LikeModel): Promise<boolean>
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
	public findAll = async (userId: number): Promise<LikeModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT id, userid, itemid, shopid, createdAt, updatedAt FROM Likes WHERE userid = ${userId}`
			)

			return response as LikeModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (id: number): Promise<LikeModel> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT * from Likes WHERE id = ${id}`
			)
			return (response as LikeModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (like: LikeModel): Promise<boolean> => {
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
