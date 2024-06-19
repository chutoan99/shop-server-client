import { BaseResponse } from '~/systems/other/response.system'
import {CommentModel} from './comment.model'

export default interface CommentResponse extends BaseResponse {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: CommentModel[]
}
