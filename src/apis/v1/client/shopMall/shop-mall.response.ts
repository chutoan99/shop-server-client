import { BaseResponse } from '~/systems/other/response.system'
import { ShopMallModel } from './shop-mall.model'

export interface ShopMallResponse extends BaseResponse {
	total: number
	response: ShopMallModel[][]
}
