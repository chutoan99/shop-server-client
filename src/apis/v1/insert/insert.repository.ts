import { BaseDataBase } from '~/systems/dataBase'
import { LoggerSystem } from '~/systems/logger'
import { IndustryModel } from '../client/industry/industry.model'
import { CategoryModel } from '../client/categoryTree/category-tree.model'
import { BannerModel } from '../client/banner/banner.model'
import { ShopMallModel } from '../client/shopMall/shop-mall.model'
import { SearchSuggestModel } from '../client/searchSuggest/search-suggest.model'
import { NotifyModel } from '../client/notify/notify.model'
import { BatchListModel } from '../client/batchList/batchList.model'
import { TopProductModel } from '../client/topProduct/top-product.model'
import { FlashSaleModel } from '../client/flashSale/flash-sale.model'
import { ShopModel } from '../client/shop/shop.model'
import { UserModel } from '../client/user/user.model'
import { PostModel } from '../client/post/post.model'
import { DeepDiscountSkinModel, VideoModel, VoucherModel } from './insert.model'
export default class InsertRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
  
	constructor() {
		this._baseDataBase = new BaseDataBase()
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase.initDb()
	}
	public Industry = (data: IndustryModel[][]) => {
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

	public InsertHomeCategories = (data: CategoryModel[][]) => {
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

	public InsertBanner = (data: BannerModel[][]) => {
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

	public InsertShopMall = (data: ShopMallModel[][]) => {
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

	public InsertSearchSuggestion = (data: SearchSuggestModel[][]) => {
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

	public InsertNotify = (data: NotifyModel[][]) => {
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

	public InsertBatchList = (data: BatchListModel[][]) => {
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

	public InsertTopProduct = (data: TopProductModel[][]) => {
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

	public InsertFlashSale = (data: FlashSaleModel[][]) => {
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

	public InsertShop = (data: ShopModel[][]) => {
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

	public InsertUser = (data: UserModel[][]) => {
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

	public InsertPost = (data: PostModel[][]) => {
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

	public InsertVoucherInfo = (data: VoucherModel[][]) => {
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

	public InsertVideoInfoList = (data: VideoModel[][]) => {
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

	public InsertDeepDiscountSkin = (data: DeepDiscountSkinModel[][]) => {
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
