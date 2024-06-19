import BaseModel from '~/systems/other/baseMode.system'

export  interface TopProductModel extends BaseModel {
	id: number
	data_type: string
	count: number
	name: string
	images: string
	sort_type: number
	best_price: number
	display_text: string
}
