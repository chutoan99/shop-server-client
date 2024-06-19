import BaseModel from '~/systems/other/baseMode.system'

export  interface CategoryModel extends BaseModel {
	id: number
	display_name: string
	parent_catid: number
	name: string
	image: string
	unselected_image: string
	selected_image: string
	level: number
}
