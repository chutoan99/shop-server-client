import BaseModel from '~/systems/other/baseMode.system'

export  interface OrderModel extends BaseModel {
	id: number
	shopid: number
	userid: number
	item_groups_id: string
	amount: string
	item_option: string
	final_total: number
	total_num_items: number
	shop_name: string
	note: string
	state: string
	type: number
	shiped: boolean
	tierVariation: string
}
