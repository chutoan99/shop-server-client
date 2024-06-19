import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import {SearchHistoryModel} from './search-history.model'
import { LoggerSystem } from '~/systems/logger'
interface ISearchHistoryRepository {
	findAll(userid: number): Promise<SearchHistoryModel[]>
	create(search: SearchHistoryModel): Promise<boolean>
}

export default class SearchHistoryRepository
	implements ISearchHistoryRepository
{
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (userid: number): Promise<SearchHistoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT id, userid, text, createdAt, updatedAt  FROM SearchHistories WHERE userid = ${userid} ORDER BY createdAt DESC LIMIT 10`
			)

			return response as SearchHistoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (search: SearchHistoryModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`INSERT INTO SearchHistories (userid, text) VALUES (?, ?)`,
					[search.userid, search.text]
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
