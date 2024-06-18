import { BaseResponse } from '~/@core/systems/response'
import { BaseDataBase } from '~/systems/dataBase'
import Category from './category-tree.entity'
import { LoggerSystem } from '~/systems/logger'

interface ICategoriesRepository {
	findAll(level: number): Promise<Category[]>
	search(catid: number): Promise<Category[]>
}
export default class CategoriesRepository implements ICategoriesRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase = new BaseDataBase()
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (level: number): Promise<Category[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT * FROM HomeCategories WHERE level = ${level}`
			)

			return response as Category[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public search = async (catid: number): Promise<Category[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT * FROM HomeCategories WHERE parent_catid = ${catid}`
			)

			return response as Category[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
