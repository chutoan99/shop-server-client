import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { LoggerSystem } from '~/systems/logger'
import { ShopModel } from './shop.model'
import { PostModel } from '../post/post.model'
interface IShopRepository {
	findItems(id: number): Promise<PostModel[]>
	find(id: number): Promise<ShopModel>
}

export default class ShopRepository implements IShopRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findItems = async (id: number): Promise<PostModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT Posts.* FROM Shops LEFT JOIN Posts ON Shops.id = Posts.shopid WHERE Shops.id = ${id}`
			)

			return response as PostModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (id: number): Promise<ShopModel> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
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
				WHERE id = ${id} LIMIT 1
			`)

			return (response as ShopModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
