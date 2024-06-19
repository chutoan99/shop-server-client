import { BaseResponse } from '~/systems/other/response.system'
import { LikeModel } from './like.model'

export default interface LikeResponse extends BaseResponse {
	total: number
	response: LikeModel[]
}
