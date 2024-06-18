import SearchHistory from './search-history.entity'

export interface SearchHistoryResponse {
	err: number
	msg: string
	total: number
	response: SearchHistory[]
}
