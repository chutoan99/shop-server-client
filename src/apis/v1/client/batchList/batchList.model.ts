import BaseModel from '~/systems/other/baseMode.system'

export  interface BatchListModel extends BaseModel {
	id: number
	banner_image: string
	title: string
	end: Date
	start: Date
}
