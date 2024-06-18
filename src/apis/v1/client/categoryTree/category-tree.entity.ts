import BaseModel from '~/systems/other/baseMode.system'

export default interface Category extends BaseModel {
	id: number
	display_name: string
	parent_catid: number
	name: string
	image: string
	unselected_image: string
	selected_image: string
	level: number
}
