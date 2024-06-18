import { BaseDataBase } from '~/systems/dataBase'
import Post from './post.entity'
import { BaseResponse } from '~/@core/systems/response'
import PostQuery from './post.query'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { LoggerSystem } from '~/systems/logger'

interface IPostRepository {
	find(itemid: number): Promise<Post>
	search(pagination: PaginationSystem, queries: PostQuery): Promise<Post[]>
}

export default class PostRepository implements IPostRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}

	public find = async (itemid: number): Promise<Post> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
            SELECT
              Posts.id,
              Posts.shopid,
              Posts.catid,
              Posts.discountid,
              Posts.currency,
              Posts.stock,
              Posts.status,
              Posts.sold,
              Posts.liked_count,
              Posts.cmt_count,
              Posts.discount,
              Posts.raw_discount,
              Posts.shop_name,
              Posts.description,
              Posts.view_count,
              Posts.name,
              Posts.image,
              Posts.price,
              Posts.price_min,
              Posts.price_max,
              Posts.historical_sold,
              Posts.price_before_discount,
              Posts.price_min_before_discount,
              Posts.price_max_before_discount,
              Posts.shop_rating,
              Posts.liked,
              Posts.is_official_shop,
              Posts.is_service_by_shop,
              Posts.show_free_shipping,
              Posts.name_tierVariations,
              JSON_ARRAYAGG(Posts.name_attributes) AS name_attributes,
              JSON_ARRAYAGG(Posts.value_attributes) AS value_attributes,
              JSON_ARRAYAGG(Posts.option_tierVariations) AS option_tierVariations,
              JSON_ARRAYAGG(Posts.images_tierVariations) AS images_tierVariations,
              JSON_ARRAYAGG(Posts.images) AS images,
              Posts.createdAt,
              Posts.updatedAt,
            CASE
                WHEN Shops.id AND Posts.shopid   IS NOT NULL THEN JSON_OBJECT (
                  'id', Shops.id,
                  'userid', Shops.userid,
                  'item_count', Shops.item_count,
                  'name', Shops.name,
                  'cover', Shops.cover,
                  'follower_count', Shops.follower_count,
                  'rating_star', Shops.rating_star,
                  'rating_bad', Shops.rating_bad,
                  'rating_good', Shops.rating_good,
                  'rating_normal', Shops.rating_normal,
                  'status', Shops.status,
                  'shop_location', Shops.shop_location,
                  'username', Shops.username,
                  'portrait', Shops.portrait,
                  'response_rate', Shops.response_rate,
                  'country', Shops.country,
                  'description', Shops.description,
                  'followed',  Shops.followed,
                  'last_active_time', Shops.last_active_time,
                  'is_official_shop', Shops.is_official_shop,
                  'createdAt', Shops.createdAt,
                  'updatedAt', Shops.updatedAt
                )
                ELSE NULL
            END AS shop_info,
            CASE
                WHEN VoucherProducts.id  AND Posts.promotionid  IS NOT NULL THEN JSON_OBJECT(
                    'id', VoucherProducts.id,
                  'label', VoucherProducts.label,
                  'voucher_code', VoucherProducts.voucher_code
                )
                ELSE NULL
            END AS voucher,
            CASE
                WHEN DeepDiscountSkins.id  AND Posts.discountid IS NOT NULL THEN JSON_OBJECT(
                  'id', DeepDiscountSkins.id,
                  'text', DeepDiscountSkins.text,
                  'hidden_promotion_price', DeepDiscountSkins.hidden_promotion_price,
                  'promotion_price', DeepDiscountSkins.promotion_price,
                  'start_time', DeepDiscountSkins.start_time,
                  'end_time', DeepDiscountSkins.end_time
                )
                ELSE NULL
            END AS deep_discount_skin,
            CASE
                WHEN Videos.id AND Posts.videoid IS NOT NULL THEN JSON_OBJECT(
                  'id', Videos.id,
                  'thumb_url', Videos.thumb_url,
                  'duration', Videos.duration,
                  'version', Videos.version,
                  'width', Videos.width,
                  'height', Videos.height,
                  'defn', Videos.defn,
                  'profile', Videos.profile,
                  'url', Videos.url
                )
                ELSE NULL
            END AS video,
            CASE
                WHEN Industries.id AND Posts.catid IS NOT NULL THEN JSON_OBJECT(
                  'id', Industries.id,
                  'category_name', Industries.category_name,
                  'parent_catid', Industries.parent_catid,
                  'images', Industries.images,
                  'level', Industries.level
                )
                ELSE NULL
            END AS category
          FROM
            Posts
            LEFT JOIN VoucherProducts ON Posts.promotionid = VoucherProducts.id
            LEFT JOIN Shops ON Posts.shopid = Shops.id
            LEFT JOIN Videos ON Posts.videoid = Videos.id
            LEFT JOIN Industries ON Posts.catid = Industries.id
            LEFT JOIN DeepDiscountSkins ON Posts.discountid = DeepDiscountSkins.id
          WHERE
            Posts.id = ${itemid}
      `)

			return (response as Post[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public search = async (
		pagination: PaginationSystem,
		queries: PostQuery
	): Promise<Post[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(`
        SELECT
            id,
            shopid,
            catid,
            name,
            image,
            historical_sold,
            discount,
            show_free_shipping,
            is_official_shop,
            is_service_by_shop,
            shop_rating,
            filename,
            shop_name,
            liked,
            stock,
            price_before_discount,
            price_min_before_discount,
            price_min,
            price,
            price_max,
            price_max_before_discount,
            COUNT(*) OVER() AS total
          FROM Posts
          WHERE
            name LIKE '%${queries.name}%'
          ORDER BY createdAt DESC
          LIMIT ${pagination.limit}
          OFFSET ${pagination.offset}
      `)

			return response as Post[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
