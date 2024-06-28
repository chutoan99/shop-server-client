import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { LoggerSystem } from '~/systems/logger'
import { CartModel } from './cart.model'
interface ICartRepository {
	findAll(userId: number): Promise<CartModel[]>
	find(cart: CartModel, userId: number): Promise<CartModel>
	create(cart: CartModel): Promise<boolean>
	update(id: number, cart: CartModel): Promise<boolean>
	updateAmount(
		cart: CartModel,
		userId: number,
		newAmount: number
	): Promise<boolean>
	delete(id: number): Promise<boolean>
}

export default class CartRepository implements ICartRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase = new BaseDataBase()
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (userId: number): Promise<CartModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
					SELECT
						Carts.*,
					CASE
						WHEN Posts.id IS NOT NULL THEN JSON_OBJECT(
							'itemid', Posts.id,
							'shopid', Posts.shopid,
							'catid', Posts.catid,
							'name', Posts.name,
							'image', Posts.image,
							'historical_sold', Posts.historical_sold,
							'discount', Posts.discount,
							'show_free_shipping', Posts.show_free_shipping,
							'is_official_shop', Posts.is_official_shop,
							'is_service_by_shop', Posts.is_service_by_shop,
							'shop_rating', Posts.shop_rating,
							'filename', Posts.filename,
							'shop_name', Posts.shop_name,
							'liked', Posts.liked,
							'stock', Posts.stock,
							'price_before_discount', Posts.price_before_discount,
							'price_min_before_discount', Posts.price_min_before_discount,
							'price_min', Posts.price_min,
							'price', Posts.price,
							'price_max', Posts.price_max,
							'price_max_before_discount', Posts.price_max_before_discount,
							'name_tierVariations', Posts.name_tierVariations,
							'option_tierVariations', JSON_ARRAYAGG(Posts.option_tierVariations),
							'images_tierVariations', JSON_ARRAYAGG(Posts.images_tierVariations),
							'images', JSON_ARRAYAGG(Posts.images)
						)
						ELSE NULL 
					END AS overview
					FROM
						Carts
						LEFT JOIN Posts ON Carts.itemid = Posts.id
					WHERE
						Carts.userid = ${userId}
					GROUP BY
						Carts.id, Carts.userid, Carts.itemid, Carts.shopid, Carts.amount, Carts.item_option,
						Posts.id, Posts.shopid, Posts.catid, Posts.name, Posts.image, Posts.historical_sold, Posts.discount, 
						Posts.show_free_shipping, Posts.is_official_shop, Posts.is_service_by_shop, Posts.shop_rating, Posts.filename, 
						Posts.shop_name, Posts.liked, Posts.stock, Posts.price_before_discount, Posts.price_min_before_discount, 
						Posts.price_min, Posts.price, Posts.price_max, Posts.price_max_before_discount, Posts.name_tierVariations;
        		`)

			return response as CartModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (cart: CartModel, userId: number): Promise<CartModel> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
				SELECT  
					* from Carts 
				WHERE 
					userid = '${userId}' AND 
					itemid = '${cart.itemid}' AND 
					shopid = '${cart.shopid}' AND 
					item_option = '${cart.item_option}' 
				LIMIT 1
			`)

			return (response as CartModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (cart: CartModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`INSERT INTO Carts (id, userid, itemid, shopid, tierVariation, item_option, amount) VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[
						cart.id,
						cart.userid,
						cart?.itemid,
						cart?.shopid,
						cart?.tierVariation,
						cart?.item_option,
						cart?.amount
					]
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public update = async (id: number, cart: CartModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`UPDATE Carts SET item_option = '${cart.item_option}', amount = ${cart.amount} WHERE id = ${id}`
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public updateAmount = async (
		cart: CartModel,
		userId: number,
		newAmount: number
	): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] = await this
				._baseDataBase.db.query(`
      			UPDATE Carts
      				SET 
						userid = ${userId}, 
						itemid = ${cart.itemid}, 
						shopid = ${cart.shopid}, 
						item_option = '${cart.item_option}', 
						amount = ${newAmount}
      				WHERE 
						userid = '${userId}' AND 
						itemid = '${cart.itemid}' AND 
						shopid = '${cart.shopid}' AND 
						item_option = '${cart.item_option}'
      			`)
			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public delete = async (id: number): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`DELETE FROM Carts WHERE id = ${id}`
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
