import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import TopProduct from './top-product.entity'
import { LoggerSystem } from '~/systems/logger'
interface ITopProductRepository {
	findAll(): Promise<TopProduct[]>
}

export default class TopProductRepository implements ITopProductRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public findAll = async (): Promise<TopProduct[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, data_type, count, name, images, sort_type, best_price, display_text, createdAt, updatedAt FROM TopProducts`
			)
			return response as TopProduct[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
