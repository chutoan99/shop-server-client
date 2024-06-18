import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import ShopMall from './shop-mall.entity'
import { LoggerSystem } from '~/systems/logger'
interface IShopMallRepository {
	findAll(): Promise<ShopMall[]>
}
export default class ShopMallRepository implements IShopMallRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase = new BaseDataBase()
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<ShopMall[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, url, image, promo_text, createdAt, updatedAt FROM ShopMalls`
			)
			return response as ShopMall[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
