import BaseModel from '~/systems/other/baseMode.system'
export  interface IndustryModel extends BaseModel {
	id: number
	parent_catid: number
	level: number
	category_name: string
	images: string
}
