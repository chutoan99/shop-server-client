import { ResultResponse } from '~/@core/systems/response'
import { BaseDataBase } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { BannerModel } from './banner.model'

interface IBannerRepository {
	findAll(): Promise<BannerModel[]>
}

export default class BannerRepository implements IBannerRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public findAll = async (): Promise<BannerModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT id, image_url , createdAt , updatedAt  FROM Banners`
			)

			return response as BannerModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
