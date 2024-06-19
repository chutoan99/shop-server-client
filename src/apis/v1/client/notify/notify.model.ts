import BaseModel from '~/systems/other/baseMode.system'

export  interface NotifyModel extends BaseModel {
	id: number
	userid: number
	image: string
	title: string
	content: string
	seen: boolean
	time: Date
}
