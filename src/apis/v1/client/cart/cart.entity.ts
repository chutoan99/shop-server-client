import BaseModel from '~/systems/other/baseMode.system'

export default interface Cart extends BaseModel {
	id: number
	shopid: number
	amount: number
	userid: number
	itemid: number
	tierVariation: string
	item_option: string
}
