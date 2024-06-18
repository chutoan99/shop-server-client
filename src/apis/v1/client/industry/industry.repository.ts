import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import Industry from './industry.entity'
import IndustryQuery from './industry.query'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { LoggerSystem } from '~/systems/logger'
interface IIndustryRepository {
	findAll(): Promise<Industry[]>
	search(
		pagination: PaginationSystem,
		queries: IndustryQuery
	): Promise<Industry[]>
}

export default class IndustryRepository implements IIndustryRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public findAll = async (): Promise<Industry[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, parent_catid, level, category_name, images, createdAt, updatedAt  FROM Industries`
			)

			return response as Industry[]
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
	): Promise<Industry[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
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

			return response as Industry[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
