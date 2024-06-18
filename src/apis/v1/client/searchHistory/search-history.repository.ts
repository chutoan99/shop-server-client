import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import SearchHistory from './search-history.entity'
import { LoggerSystem } from '~/systems/logger'
interface ISearchHistoryRepository {
	findAll(userid: number): Promise<SearchHistory[]>
	create(search: SearchHistory): Promise<boolean>
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
	public findAll = async (userid: number): Promise<SearchHistory[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, userid, text, createdAt, updatedAt  FROM SearchHistories WHERE userid = ${userid} ORDER BY createdAt DESC LIMIT 10`
			)

			return response as SearchHistory[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (search: SearchHistory): Promise<boolean> => {
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
