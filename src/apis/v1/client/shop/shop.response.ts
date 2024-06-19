import { BaseResponse } from '~/systems/other/response.system'
import { PostModel } from '../post/post.model'
import { ShopModel } from './shop.model'

export interface ShopResponse extends BaseResponse {
	response: ShopModel
}

export interface ShopItemsResponse  extends BaseResponse {
	total: number
	response: PostModel[]
}
