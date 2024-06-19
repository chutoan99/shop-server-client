import { BaseResponse } from '~/systems/other/response.system'
import { BatchListModel } from './batchList.model'

export interface BatchListResponse  extends BaseResponse {
	total: number
	response: BatchListModel[]
}
