import { ResultResponse } from '~/@core/systems/response'
import { BaseDataBase } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { CategoryModel } from './category-tree.model'

interface ICategoriesRepository {
	findAll(level: number): Promise<CategoryModel[]>
	search(catid: number): Promise<CategoryModel[]>
}
export default class CategoriesRepository implements ICategoriesRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase = new BaseDataBase()
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (level: number): Promise<CategoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT * FROM HomeCategories WHERE level = ${level}`
			)

			return response as CategoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public search = async (catid: number): Promise<CategoryModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT * FROM HomeCategories WHERE parent_catid = ${catid}`
			)

			return response as CategoryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
