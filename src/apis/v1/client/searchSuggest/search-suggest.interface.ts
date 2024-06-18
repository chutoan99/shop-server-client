import SearchSuggest from './search-suggest.entity'

export interface SearchSuggestResponse {
	err: number
	msg: string
	total: number
	response: SearchSuggest[]
}
