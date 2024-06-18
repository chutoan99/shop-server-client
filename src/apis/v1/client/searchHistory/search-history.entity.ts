import BaseModel from '~/systems/other/baseMode.system'

export default interface SearchHistory extends BaseModel {
	id: number
	userid: number
	text: string
}
