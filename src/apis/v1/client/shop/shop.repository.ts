import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import Post from '../post/post.entity'
import Shop from './shop.entity'
import { LoggerSystem } from '~/systems/logger'
interface IShopRepository {
	findItems(shopid: number): Promise<Post[]>
	find(shopid: number): Promise<Shop>
}

export default class ShopRepository implements IShopRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findItems = async (shopid: number): Promise<Post[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT Posts.* FROM Shops LEFT JOIN Posts ON Shops.id = Posts.shopid WHERE Shops.id = ${shopid}`
			)

			return response as Post[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (shopid: number): Promise<Shop> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
				SELECT 
					id,  
					userid, 
					item_count, 
					name, 
					cover, 
					follower_count,
					rating_star, 
					rating_bad, 
					rating_good, 
					rating_normal, 
					status, 
					shop_location, 
					username, 
					portrait, 
					response_rate, 
					country, 
					response_time, 
					description, 
					followed, 
					last_active_time, 
					is_official_shop, 
					createdAt, 
					updatedAt  
				FROM 
					Shops
				WHERE id = ${shopid} LIMIT 1
			`)

			return (response as Shop[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
