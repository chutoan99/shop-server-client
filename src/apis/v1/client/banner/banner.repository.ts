import { BaseResponse } from '~/@core/systems/response'
import { BaseDataBase } from '~/systems/dataBase'
import Banner from './banner.entity'
import { LoggerSystem } from '~/systems/logger'

interface IBannerRepository {
	findAll(): Promise<Banner[]>
}

export default class BannerRepository implements IBannerRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public findAll = async (): Promise<Banner[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, image_url , createdAt , updatedAt  FROM Banners`
			)

			return response as Banner[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
