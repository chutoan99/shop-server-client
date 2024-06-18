import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import FlashSale from './flash-sale.entity'
import { LoggerSystem } from '~/systems/logger'
interface IFlashSaleRepository {
	findAll(): Promise<FlashSale[]>
}
export default class FlashSaleRepository implements IFlashSaleRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<FlashSale[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
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

			return response as FlashSale[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
