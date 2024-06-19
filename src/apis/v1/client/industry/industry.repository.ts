import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import IndustryQuery from './industry.query'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { LoggerSystem } from '~/systems/logger'
import { IndustryModel } from './industry.model'
interface IIndustryRepository {
	findAll(): Promise<IndustryModel[]>
	search(
		pagination: PaginationSystem,
		queries: IndustryQuery
	): Promise<IndustryModel[]>
}

export default class IndustryRepository implements IIndustryRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public findAll = async (): Promise<IndustryModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT id, parent_catid, level, category_name, images, createdAt, updatedAt  FROM Industries`
			)

			return response as IndustryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public search = async (
		pagination: PaginationSystem,
		queries: IndustryQuery
	): Promise<IndustryModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
					SELECT Posts.*, TotalCount.total
					FROM Posts
					INNER JOIN Industries ON Posts.catid = Industries.id
					CROSS JOIN (
						SELECT COUNT(*) AS total
						FROM Posts
						INNER JOIN Industries ON Posts.catid = Industries.id
						WHERE Industries.category_name = '${queries.category_name}'
					) AS TotalCount
					WHERE Industries.category_name = '${queries.category_name}'
					LIMIT ${pagination.limit}
					OFFSET ${pagination.offset}
      		`)

			return response as IndustryModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
