import { BaseResponse } from '~/systems/other/response.system'
import { NotifyModel } from './notify.model'

export interface NotifyResponse extends BaseResponse {
	total: number
	response: NotifyModel[]
}
