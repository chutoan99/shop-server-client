import { BaseResponse } from '~/systems/other/response.system'
import { BannerModel } from './banner.model'
export interface BannerResponse extends BaseResponse {
	total: number
	response: BannerModel[]
}
