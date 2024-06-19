import { Builder } from 'builder-pattern'
import bcrypt from 'bcrypt'
import { formatDate } from '~/helpers/date'
import _ from 'lodash'
import { CategoryModel } from '../client/categoryTree/category-tree.model'
import { ShopModel } from '../client/shop/shop.model'
import { UserModel } from '../client/user/user.model'
import { ROLE } from '~/systems/other/role.interface'
import { FlashSaleModel } from '../client/flashSale/flash-sale.model'
import { PostModel } from '../client/post/post.model'
import { ShopMallModel } from '../client/shopMall/shop-mall.model'
import { SearchSuggestModel } from '../client/searchSuggest/search-suggest.model'
import { NotifyModel } from '../client/notify/notify.model'
import { DeepDiscountSkinModel, VideoModel, VoucherModel } from './insert.model'
import { IndustryModel } from '../client/industry/industry.model'
import { BannerModel } from '../client/banner/banner.model'
import { BatchListModel } from '../client/batchList/batchList.model'
import { TopProductModel } from '../client/topProduct/top-product.model'
import { CommentModel } from '../client/comment/comment.model'
export default class InsertHelper {
	public hashPassWord = (password: string) => {
		const result = bcrypt.hashSync(password, bcrypt.genSaltSync(12))
		return result
	}

	public processDataCategory = (item: any): CategoryModel => {
		return Builder<CategoryModel>()
			.id(item.catid)
			.parent_catid(item.parent_catid)
			.name(item.name)
			.display_name(item.display_name)
			.image(`https://cf.shopee.vn/file/${item.image}`)
			.unselected_image(
				`https://cf.shopee.vn/file/${item.unselected_image}`
			)
			.selected_image(`https://cf.shopee.vn/file/${item.selected_image}`)
			.level(item.level)
			.build()
	}

	public processDataShop = (jsonData: any): ShopModel => {
		return Builder<ShopModel>()
			.id(jsonData?.data?.shopid)
			.userid(jsonData?.data?.userid)
			.portrait(
				jsonData?.data?.account?.portrait === ''
					? null
					: `https://cf.shopee.vn/file/${jsonData?.data?.account?.portrait}`
			)
			.username(jsonData?.data?.account?.username)
			.is_official_shop(jsonData?.data?.is_official_shop)
			.shop_location(jsonData?.data?.shop_location)
			.item_count(jsonData?.data?.item_count)
			.name(jsonData?.data?.name)
			.cover(
				jsonData?.data?.cover === ''
					? null
					: `https://cf.shopee.vn/file/${jsonData?.data?.cover}`
			)
			.rating_star(jsonData?.data?.rating_star)
			.rating_bad(jsonData?.data?.rating_bad)
			.rating_good(jsonData?.data?.rating_good)
			.rating_normal(jsonData?.data?.rating_normal)
			.follower_count(jsonData?.data?.follower_count)
			.status(jsonData?.data?.status)
			.response_time(jsonData?.data?.response_time)
			.description(jsonData?.data?.description)
			.followed(false)
			.response_rate(jsonData?.data?.response_rate)
			.country(jsonData?.data?.country)
			.last_active_time(formatDate(jsonData?.data?.last_active_time))
			.createdAt(formatDate(jsonData?.data?.ctime))
			.updatedAt(formatDate(jsonData?.data?.ctime))
			.build()
	}

	public processDataUser = (jsonData: any): UserModel => {
		const sex = 0
		const img_men =
			'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'
		const img_women =
			'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'
		return Builder<UserModel>()
			.id(jsonData?.data?.userid)
			.shopid(jsonData?.data?.shopid)
			.name(jsonData?.data?.name)
			.username(jsonData?.data?.account?.username)
			.email(`admin${jsonData?.data?.userid}@gmail.com`)
			.sex(sex)
			.role(ROLE.ADMIN)
			.password(
				this.hashPassWord(
					`${jsonData?.data?.account?.username}${jsonData?.data?.userid}`
				)
			)
			.avatar(sex === 0 ? img_men : img_women)
			.address(jsonData?.data?.shop_location)
			.phone(0)
			.build()
	}

	public processDataFlashSale = (item: any): FlashSaleModel => {
		return Builder<FlashSaleModel>()
			.id(item.itemid)
			.shopid(item.shopid)
			.catid(item.catid)
			.name(item.name)
			.image(
				item.image === ''
					? null
					: `https://cf.shopee.vn/file/${item.image}`
			)
			.stock(item.stock)
			.historical_sold(item.historical_sold)
			.price(+item.price / 100000)
			.price_before_discount(+item.price_before_discount / 100000)
			.discount(item.discount)
			.shop_rating(item.shop_rating)
			.liked(item.liked ? true : false)
			.is_official_shop(item.is_official_shop)
			.is_service_by_shopee(item.is_service_by_shopee)
			.show_free_shipping(item.show_free_shipping)
			.start_time(formatDate(item.start_time))
			.end_time(formatDate(item.end_time))
			.build()
	}

	public processDataPost = (item: any): PostModel => {
		return Builder<PostModel>()
			.id(item?.itemid)
			.shopid(item?.shopid)
			.currency(item?.currency)
			.stock(item?.stock)
			.status(item?.status)
			.sold(item?.sold)
			.liked_count(item?.liked_count)
			.promotionid(item?.voucher_info?.promotion_id || null)
			.videoid(item?.video_info_list[0]?.video_id || null)
			.discountid(item?.itemid)
			.catid(item?.catid)
			.cmt_count(item?.cmt_count)
			.discount(item?.discount)
			.description(item?.description)
			.raw_discount(item?.raw_discount)
			.size_chart(
				item?.size_chart === null
					? null
					: `https://cf.shopee.vn/file/${item?.size_chart}`
			)
			.shop_name(item?.shop_name)
			.transparent_background_image(
				item?.transparent_background_image === ''
					? null
					: `https://cf.shopee.vn/file/${item?.transparent_background_image}`
			)
			.images(
				(
					item?.images.map((item: any) => {
						return `https://cf.shopee.vn/file/${item}`
					}) as any
				).join(',')
			)
			.view_count(item?.view_count ? item?.view_count : 0)
			.name(item?.name)
			.image(
				item?.image === ''
					? null
					: `https://cf.shopee.vn/file/${item?.image}`
			)
			.historical_sold(item?.historical_sold)
			.price(+item?.price / 100000)
			.price_min(+item?.price_min / 100000)
			.price_max(+item?.price_max / 100000)
			.price_before_discount(+item?.price_before_discount / 100000)
			.price_min_before_discount(
				+item?.price_min_before_discount / 100000
			)
			.price_max_before_discount(
				+item?.price_max_before_discount / 100000
			)
			.shop_rating(item?.shop_rating)
			.liked(item?.liked ? true : false)
			.is_official_shop(item?.is_official_shop)
			.is_service_by_shop(item?.is_service_by_shopee)
			.show_free_shipping(item?.show_free_shipping)
			.name_tierVariations(
				!item?.tier_variations[0]?.name
					? null
					: item?.tier_variations[0]?.name
			)
			.name_attributes(
				!item?.tier_variations[0]?.name
					? (
							item?.attributes?.map(
								(item: any) => item?.name
							) as any
					  )?.join(',')
					: null
			)
			.option_tierVariations(
				!item?.tier_variations[0]?.name &&
					item?.tier_variations[0]?.options?.length > 0
					? null
					: item?.tier_variations[0]?.options?.join(',')
			)
			.images_tierVariations(
				!item?.tier_variations[0]?.name &&
					item?.tier_variations[0]?.images?.length > 0
					? null
					: (
							item?.tier_variations[0]?.images?.map(
								(item: any) => {
									return `https://cf.shopee.vn/file/${item}`
								}
							) as any
					  )?.join(',')
			)
			.createdAt(formatDate(item?.ctime))
			.updatedAt(formatDate(item?.ctime))
			.build()
	}

	public processDataShopMall = (item: any): ShopMallModel => {
		return Builder<ShopMallModel>()
			.id(item?.shopid)
			.url(item?.url)
			.image(
				`https://cf.shopee.vn/file/dec6ad9d361464deee14f9bec977d29f/${item?.image}`
			)
			.promo_text(item?.promo_text)
			.build()
	}

	public processDataSearchSuggest = (item: any): SearchSuggestModel => {
		return Builder<SearchSuggestModel>()
			.text(item?.text)
			.count(item?.count)
			.build()
	}

	public processDataNotify = (item: any): NotifyModel => {
		return Builder<NotifyModel>()
			.userid(item?.userid)
			.seen(item?.seen)
			.image(item?.image)
			.title(item?.title)
			.content(item?.content)
			.time(item?.time)
			.build()
	}

	public processDataVoucher = (item: any): VoucherModel => {
		return Builder<VoucherModel>()
			.id(item?.voucher_info?.promotion_id)
			.voucher_code(item?.voucher_info?.voucher_code)
			.label(item?.voucher_info?.voucher_code)
			.createdAt(formatDate(item?.ctime))
			.updatedAt(formatDate(item?.ctime))
			.build()
	}

	public processDataVideo = (item: any): VideoModel => {
		return Builder<VideoModel>()
			.id(item?.video_info_list[0]?.video_id)
			.thumb_url(item?.video_info_list[0]?.thumb_url)
			.duration(item?.video_info_list[0]?.duration)
			.version(item?.video_info_list[0]?.version)
			.defn(item?.video_info_list[0]?.default_format?.defn)
			.profile(item?.video_info_list[0]?.default_format?.profile)
			.url(item?.video_info_list[0]?.default_format?.url)
			.width(item?.video_info_list[0]?.default_format?.width)
			.height(item?.video_info_list[0]?.default_format?.height)
			.createdAt(formatDate(item?.ctime))
			.updatedAt(formatDate(item?.ctime))
			.build()
	}

	public processDataDeepDiscountSkin = (item: any): DeepDiscountSkinModel => {
		return Builder<DeepDiscountSkinModel>()
			.id(item?.itemid)
			.promotion_price(
				item?.deep_discount_skin?.skin_data?.promo_label
					?.promotion_price
			)
			.hidden_promotion_price(
				item?.deep_discount_skin?.skin_data?.promo_label
					?.hidden_promotion_price
			)
			.start_time(
				formatDate(
					item?.deep_discount_skin?.skin_data?.promo_label?.start_time
				)
			)
			.end_time(
				formatDate(
					item?.deep_discount_skin?.skin_data?.promo_label?.end_time
				)
			)
			.createdAt(formatDate(item?.ctime))
			.updatedAt(formatDate(item?.ctime))
			.build()
	}

	public processDataIndustry = (item: any, level: number): IndustryModel => {
		return Builder<IndustryModel>()
			.id(item.path[level].category_id)
			.parent_catid(level === 0 ? null : item.path[level - 1].category_id)
			.level(level)
			.category_name(item.path[level].category_name)
			.images(item.images[level])
			.is_active(true)
			.build()
	}

	public processDataBanner = (item: any): BannerModel => {
		return Builder<BannerModel>().image_url(item?.image_url).build()
	}

	public processDataBatchList = (item: any): BatchListModel => {
		return Builder<BatchListModel>()
			.banner_image(item?.banner_image)
			.title(JSON.parse(item.navigate_params.navbar.title).default)
			.end(formatDate(item?.end))
			.start(formatDate(item?.start))
			.build()
	}

	public processDataTopProduct = (item: any): TopProductModel => {
		return Builder<TopProductModel>()
			.data_type(item?.data_type)
			.count(item?.count)
			.name(item?.name)
			.images(
				(
					item?.images?.map((item: any) => {
						return `https://cf.shopee.vn/file/${item}`
					}) as any
				).join(',')
			)
			.sort_type(item?.sorttype)
			.best_price(item?.best_price)
			.display_text(item?.display_text)
			.build()
	}

	public processDataComment = (item: any): CommentModel => {
		return Builder<CommentModel>()
			.id(item.cmtid)
			.orderid(item?.orderid)
			.itemid(item?.itemid)
			.rating(item?.rating)
			.userid(item?.userid)
			.shopid(item?.shopid)
			.parent_cmtid(null)
			.comment(item?.comment)
			.rating_star(item?.rating_star)
			.status(item?.status)
			.author_username(item?.author_username)
			.author_portrait(
				item?.author_portrait === ''
					? null
					: `https://cf.shopee.vn/file/${item?.author_portrait}`
			)
			.images(
				item?.images?.length > 0
					? (
							item?.images?.map((item: any) => {
								return `https://cf.shopee.vn/file/${item}`
							}) as any
					  )?.join(',')
					: null
			)
			.cover(item?.videos?.length >= 0 ? item?.videos[0]?.cover : null)
			.videos(item?.videos?.length >= 0 ? item?.videos[0]?.url : null)
			.tierVariation(item?.product_items[0].model_name)
			.list_option(
				item?.product_items[0]?.options?.length > 0
					? item?.product_items[0]?.options[0]
					: null
			)
			.is_replied(item.ItemRatingReply === null ? false : true)
			.level(0)
			.is_shop(item.ItemRatingReply === null ? false : true)
			.like_count(item?.like_count ? item?.like_count : 0)
			.liked(false)
			.createdAt(formatDate(item?.mtime))
			.updatedAt(formatDate(item?.mtime))
			.build()
	}

	public processDataRatingReply = (item: any): CommentModel => {
		return Builder<CommentModel>()
			.id(item.cmtid + item?.userid)
			.orderid(item?.orderid)
			.itemid(item?.itemid)
			.rating(null)
			.userid(item?.userid)
			.shopid(item?.shopid)
			.parent_cmtid(item.cmtid)
			.comment(item.ItemRatingReply?.comment)
			.rating_star(item?.rating_star)
			.status(item?.status)
			.author_username(item?.author_username)
			.author_portrait(null)
			.images(null)
			.cover(null)
			.videos(null)
			.tierVariation(null)
			.list_option(null)
			.is_replied(true)
			.level(1)
			.is_shop(true)
			.like_count(null)
			.liked(null)
			.createdAt(formatDate(item?.mtime))
			.updatedAt(formatDate(item?.mtime))
			.build()
	}
}
