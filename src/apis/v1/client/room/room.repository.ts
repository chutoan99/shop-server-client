import { BaseDataBase } from '~/systems/dataBase'
import { ResultResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { LoggerSystem } from '~/systems/logger'
import { RoomModel } from './room.model'
interface IRoomRepository {
	findAll(userId: number): Promise<RoomModel[]>
	find(shopId: number, userId: number): Promise<RoomModel>
	create(room: RoomModel): Promise<boolean>
}

export default class RoomRepository implements IRoomRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (userId: number): Promise<RoomModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
				SELECT
				Rooms.*,
				JSON_OBJECT (
					'id',
					Shops.id,
					'userid',
					Shops.userid,
					'item_count',
					Shops.item_count,
					'name',
					Shops.name,
					'cover',
					Shops.cover,
					'follower_count',
					Shops.follower_count,
					'rating_star',
					Shops.rating_star,
					'rating_bad',
					Shops.rating_bad,
					'rating_good',
					Shops.rating_good,
					'rating_normal',
					Shops.rating_normal,
					'status',
					Shops.status,
					'shop_location',
					Shops.shop_location,
					'username',
					Shops.username,
					'portrait',
					Shops.portrait,
					'response_rate',
					Shops.response_rate,
					'country',
					Shops.country,
					'description',
					Shops.description,
					'followed',
					Shops.followed,
					'last_active_time',
					Shops.last_active_time,
					'is_official_shop',
					Shops.is_official_shop,
					'createdAt',
					Shops.createdAt,
					'updatedAt',
					Shops.updatedAt,
					'deleteAt',
					Shops.deleteAt
				) AS shop_info
			FROM
				Rooms
				LEFT JOIN Shops ON Rooms.shopid = Shops.id
			WHERE
				Rooms.userid = ${userId}
			`)

			return response as RoomModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (shopId: number, userId: number): Promise<RoomModel> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(
				`SELECT * FROM Rooms  WHERE  userid = ${userId} AND shopid = ${shopId}`
			)

			return (response as RoomModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (room: RoomModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`INSERT INTO Rooms (id, shopid, userid) VALUES (?, ?, ?)`,
					[room.id, room.shopid, room.userid]
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
