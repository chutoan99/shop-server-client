import { BaseResponse } from '~/@core/systems/response'
import { BaseDataBase } from '~/systems/dataBase'
import BatchList from './batchList.entity'
import { LoggerSystem } from '~/systems/logger'
interface IBatchListRepository {
	findAll(): Promise<BatchList[]>
}

export default class BatchListRepository implements IBatchListRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<BatchList[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, banner_image, title, end, start, createdAt, updatedAt FROM BatchLists`
			)
			return response as BatchList[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
