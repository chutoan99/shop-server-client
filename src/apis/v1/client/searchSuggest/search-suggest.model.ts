import BaseModel from '~/systems/other/baseMode.system'

export  interface SearchSuggestModel extends BaseModel {
	id: number
	text: string
	count: number
}
