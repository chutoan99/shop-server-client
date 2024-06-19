import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { FlashSaleModel } from './flash-sale.model'
interface IFlashSaleRepository {
	findAll(): Promise<FlashSaleModel[]>
}
export default class FlashSaleRepository implements IFlashSaleRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<FlashSaleModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
				SELECT 
					id,
					shopid,
					catid,
					name,
					image,
					price,
					price_before_discount,
					stock,
					discount,
					shop_rating,
					filename,
					liked,
					is_official_shop,
					is_service_by_shopee,
					start_time,
					end_time,
					createdAt, 
					updatedAt
				FROM 
					FlashSales
			`)

			return response as FlashSaleModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
