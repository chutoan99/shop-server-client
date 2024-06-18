import BaseModel from '~/systems/other/baseMode.system'

export default interface Shop extends BaseModel {
	id: number
	userid: number
	item_count: number
	rating_star: number
	name: string
	cover?: string | null
	follower_count: number
	rating_bad: number
	rating_good: number
	rating_normal: number
	status: number
	shop_location: string
	username: string
	portrait?: string | null
	response_rate: number
	country: string
	response_time: number
	description: string
	followed: boolean
	last_active_time: string
	is_official_shop: boolean
}
