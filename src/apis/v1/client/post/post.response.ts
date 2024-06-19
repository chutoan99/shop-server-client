import { BaseResponse } from '~/systems/other/response.system'
import { PostModel } from './post.model'

export interface PostResponse extends BaseResponse {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: PostModel[]
}

export interface PostIdResponse extends BaseResponse {
	response: PostModel
}
