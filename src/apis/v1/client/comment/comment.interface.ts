import Comment from './comment.entity'

export default interface CommentResponse {
	err: number
	msg: string
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: Comment[]
}
