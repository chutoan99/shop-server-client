import { BaseDataBase } from '~/systems/dataBase'
import BatchList from '../client/batchList/batchList.entity'
import SearchSuggest from '../client/searchSuggest/search-suggest.entity'
import ShopMall from '../client/shopMall/shop-mall.entity'
import Banner from '../client/banner/banner.entity'
import Notify from '../client/notify/notify.entity'
import Category from '../client/categoryTree/category-tree.entity'
import Industry from '../client/industry/industry.entity'
import TopProduct from '../client/topProduct/top-product.entity'
import FlashSale from '../client/flashSale/flash-sale.entity'
import Shop from '../client/shop/shop.entity'
import User from '../client/user/user.entity'
import Post from '../client/post/post.entity'
import { DeepDiscountSkin, Video, Voucher } from './insert.entity'
import { LoggerSystem } from '~/systems/logger'
export default class InsertRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._baseDataBase = new BaseDataBase()
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase.initDb()
	}
	public Industry = (data: Industry[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Industries (id, parent_catid, level, category_name, images) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertHomeCategories = (data: Category[][]) => {
		const sqlQuery = `INSERT IGNORE INTO HomeCategories (id, parent_catid, name, display_name, image, unselected_image, selected_image, level) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertBanner = (data: Banner[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Banners (image_url) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertShopMall = (data: ShopMall[][]) => {
		const sqlQuery = `INSERT IGNORE INTO ShopMalls (id, url, image, promo_text) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertSearchSuggestion = (data: SearchSuggest[][]) => {
		const sqlQuery = `INSERT IGNORE INTO SearchSuggestions (text, count) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertNotify = (data: Notify[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Notifications (userid, seen, image, title, content, time) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertBatchList = (data: BatchList[][]) => {
		const sqlQuery = `INSERT IGNORE INTO BatchLists (banner_image, title, end, start) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertTopProduct = (data: TopProduct[][]) => {
		const sqlQuery = `INSERT IGNORE INTO TopProducts (data_type, count, name, images, sort_type, best_price, display_text) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertFlashSale = (data: FlashSale[][]) => {
		const sqlQuery = `INSERT IGNORE INTO FlashSales (id, shopid, catid, name, image, stock, historical_sold, price, price_before_discount, discount, shop_rating, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertShop = (data: Shop[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Shops (id, userid, portrait, username, is_official_shop, shop_location, item_count,name, cover, rating_star, rating_bad, rating_good, rating_normal, follower_count, status, response_time, description, followed, response_rate, country, last_active_time, createdAt, updatedAt)  VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertUser = (data: User[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Users (id, shopid, name, username, email, sex, role, avatar, address, phone, password, createdAt, updatedAt)  VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertPost = (data: Post[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Posts (id, shopid, currency, stock, status, sold, liked_count, promotionid, videoid, discountid, catid, cmt_count, discount, description, raw_discount, size_chart, shop_name, transparent_background_image, images, view_count, name, image, historical_sold, price, price_min, price_max, price_before_discount, price_min_before_discount, price_max_before_discount, shop_rating, liked, is_official_shop, is_service_by_shop, show_free_shipping, name_attributes, value_attributes, name_tierVariations, option_tierVariations, images_tierVariations, createdAt, updatedAt) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertComment = (data: Comment[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Comments (id, orderid, itemid, rating, userid, shopid, parent_cmtid, comment, rating_star, status, author_username, author_portrait, images, cover, videos, tierVariation, list_option, is_replied, level, is_shop, like_count, liked, createdAt, updatedAt) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertVoucherInfo = (data: Voucher[][]) => {
		const sqlQuery = `INSERT IGNORE INTO VoucherProducts (id, voucher_code, label, createdAt, updatedAt) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertVideoInfoList = (data: Video[][]) => {
		const sqlQuery = `INSERT IGNORE INTO Videos (id, thumb_url, duration, version, defn, profile, url, width, height, createdAt, updatedAt) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}

	public InsertDeepDiscountSkin = (data: DeepDiscountSkin[][]) => {
		const sqlQuery = `INSERT IGNORE INTO DeepDiscountSkins (id, promotion_price, hidden_promotion_price, start_time, end_time, createdAt, updatedAt) VALUES ?`
		try {
			this._baseDataBase.db.query(sqlQuery, [data])
			console.log(sqlQuery)
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
