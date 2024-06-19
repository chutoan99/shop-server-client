import { BaseDataBase } from '~/systems/dataBase'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { ResultResponse } from '~/@core/systems/response'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { LoggerSystem } from '~/systems/logger'
import { CommentModel } from './comment.model'

interface ICommentRepository {
	findAll(pagination: PaginationSystem): Promise<CommentModel[]>
	create(comment: CommentModel): Promise<boolean>
}

export default class CommentRepository implements ICommentRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase = new BaseDataBase()

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (
		pagination: PaginationSystem
	): Promise<CommentModel[]> => {
		try {
			const [response]: ResultResponse = await this._baseDataBase.db.query(`
        SELECT
            id, 
            'like_count', 
            'liked', 
            'videos', 
            'tierVariation', 
            'options',  
            'is_replied', 
            'rating', 
            'rating_star', 
            'author_username', 
            'author_portrait', 
            'images', 
            'cover',  
            'status',
            (SELECT COUNT(*) FROM Comments) AS total
        FROM Comments
        ORDER BY createdAt DESC
        LIMIT ${pagination.limit}
        OFFSET ${pagination.offset}
      `)

			return response as CommentModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public create = async (comment: CommentModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._baseDataBase.db.execute(
					`
            INSERT IGNORE INTO Comments (id, orderid, itemid, rating, userid, shopid, parent_cmtid, comment, rating_star, status, author_username, author_portrait, images, cover, videos, tierVariation, list_option, is_replied, level, is_shop, like_count, liked)  
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						comment.id,
						comment.orderid,
						comment.itemid,
						comment.rating,
						comment.userid,
						comment.shopid,
						comment.parent_cmtid,
						comment,
						comment.rating_star,
						comment.status,
						comment.author_username,
						comment.author_portrait,
						comment.images,
						comment.cover,
						comment.videos,
						comment.tierVariation,
						comment.list_option,
						comment.is_replied,
						comment.level,
						comment.is_shop,
						comment.like_count,
						comment.liked
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
}
