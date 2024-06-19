import { BaseResponse } from '~/systems/other/response.system'
import {SearchHistoryModel} from './search-history.model'

export interface SearchHistoryResponse extends BaseResponse {
	total: number
	response: SearchHistoryModel[]
}
