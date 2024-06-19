import { BaseResponse } from '~/systems/other/response.system'
import { FlashSaleModel } from './flash-sale.model'

export interface FlashSaleResponse extends BaseResponse {
	total: number
	response: FlashSaleModel[]
}
