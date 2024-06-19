import { BaseResponse } from '~/systems/other/response.system'
import { TopProductModel } from './top-product.model'

export interface TopProductResponse extends BaseResponse {
	total: number
	response: TopProductModel[]
}
