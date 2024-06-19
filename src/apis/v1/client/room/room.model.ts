import BaseModel from '~/systems/other/baseMode.system'
import { ShopModel } from '../shop/shop.model'

export  interface RoomModel extends BaseModel {
	id: number
	userid: number
	itemid: number
	shopid: number
	shop_infor: ShopModel
}
