import { BaseResponse } from '~/systems/other/response.system'
import { SearchSuggestModel } from './search-suggest.model'

export interface SearchSuggestResponse extends BaseResponse {
	total: number
	response: SearchSuggestModel[]
}
