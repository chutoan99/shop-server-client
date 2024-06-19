import BaseModel from '~/systems/other/baseMode.system'

export  interface ShopMallModel extends BaseModel {
	id: number
	url: string
	image: string
	promo_text: string
}
