import BaseModel from '~/systems/other/baseMode.system'

export default interface Notify extends BaseModel {
	id: number
	userid: number
	image: string
	title: string
	content: string
	seen: boolean
	time: Date
}
