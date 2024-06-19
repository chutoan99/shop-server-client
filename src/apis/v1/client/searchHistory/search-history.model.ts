import BaseModel from '~/systems/other/baseMode.system'

export  interface SearchHistoryModel extends BaseModel {
	id: number
	userid: number
	text: string
}
