import Post from '../post/post.entity'
import Shop from './shop.entity'

export interface ShopResponse {
	err: number
	msg: string
	response: Shop
}

export interface ShopItemsResponse {
	err: number
	msg: string
	total: number
	response: Post[]
}
