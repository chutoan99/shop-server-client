import BaseModel from '~/systems/other/baseMode.system'

export default interface SearchSuggest extends BaseModel {
	id: number
	text: string
	count: number
}
