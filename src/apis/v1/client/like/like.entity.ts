import BaseModel from '~/systems/other/baseMode.system'

export default interface Like extends BaseModel {
	id: number
	userid: number
	itemid: number
	shopid: number
}
