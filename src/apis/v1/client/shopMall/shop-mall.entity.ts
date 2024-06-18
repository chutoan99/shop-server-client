import BaseModel from '~/systems/other/baseMode.system'

export default interface ShopMall extends BaseModel {
	id: number
	url: string
	image: string
	promo_text: string
}
