import BaseModel from '~/systems/other/baseMode.system'

export  interface LikeModel extends BaseModel {
	id: number
	userid: number
	itemid: number
	shopid: number
}
