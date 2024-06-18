import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import Room from './room.entity'
import { LoggerSystem } from '~/systems/logger'
interface IRoomRepository {
	findAll(userid: number): Promise<Room[]>
	find(userid: number, shopid: number): Promise<Room>
	create(room: Room): Promise<boolean>
}

export default class RoomRepository implements IRoomRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (userid: number): Promise<Room[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
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
				Rooms.userid = ${userid}
			`)

			return response as Room[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public find = async (shopid: number, userid: number): Promise<Room> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT * FROM Rooms  WHERE  userid = ${userid} AND shopid = ${shopid}`
			)

			return (response as Room[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (room: Room): Promise<boolean> => {
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
