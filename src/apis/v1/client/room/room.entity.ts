import BaseModel from '~/systems/other/baseMode.system'
import Shop from '../shop/shop.entity'

export default interface Room extends BaseModel {
	id: number
	userid: number
	itemid: number
	shopid: number
	shop_infor: Shop
}
