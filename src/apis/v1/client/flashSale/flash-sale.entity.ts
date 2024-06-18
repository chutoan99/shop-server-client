import { DateUnit } from 'mongoose'
import BaseModel from '~/systems/other/baseMode.system'

export default interface FlashSale extends BaseModel {
	id: number
	shopid: number
	catid: number
	name: string
	image?: string | null
	price: number
	price_before_discount: number
	stock: number
	historical_sold: number
	discount: string
	shop_rating: number
	filename: string
	liked: boolean
	is_official_shop: boolean
	is_service_by_shopee: boolean
	show_free_shipping: boolean
	start_time: Date
	end_time: DateUnit
}
