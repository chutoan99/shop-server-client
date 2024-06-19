import BaseModel from '~/systems/other/baseMode.system'

export  interface CartModel extends BaseModel {
	id: number
	shopid: number
	amount: number
	userid: number
	itemid: number
	tierVariation: string
	item_option: string
}
