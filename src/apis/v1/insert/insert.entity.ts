import BaseModel from '~/systems/other/baseMode.system'

export interface DeepDiscountSkin extends BaseModel {
	id: number
	promotion_price: string
	hidden_promotion_price: string
	text: string
	start_time: string
	end_time: string
}

export interface Video extends BaseModel {
	id: string
	thumb_url: string | null
	duration: number | null
	version: number | null
	width: number | null
	height: number | null
	defn: string | null
	profile: string | null
	url: string | null
}

export interface Voucher extends BaseModel {
	id: number
	voucher_code: string
	label: string
}
