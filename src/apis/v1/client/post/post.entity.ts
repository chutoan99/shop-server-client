import BaseModel from '~/systems/other/baseMode.system'
export default interface Post extends BaseModel {
	id: number
	shopid: number
	catid: number
	videoid: number
	promotionid: number
	discountid: number
	name: string
	image?: string | null
	currency: string
	sold: number
	historical_sold: number
	stock: number
	status: number
	price: number
	price_min: number
	price_max: number
	price_before_discount: number
	price_min_before_discount: number
	price_max_before_discount: number
	discount: string
	shop_rating: number
	filename: string
	shop_name: string
	liked: boolean
	show_free_shipping: boolean
	is_official_shop: boolean
	is_service_by_shop: boolean
	liked_count: number
	cmt_count: number
	raw_discount: number
	size_chart?: string | null
	description: string
	transparent_background_image?: string | null
	images: string
	view_count: number
	name_attributes?: string | null
	value_attributes?: string | null
	name_tierVariations?: string | null
	option_tierVariations?: string | null
	images_tierVariations?: string | null
}
