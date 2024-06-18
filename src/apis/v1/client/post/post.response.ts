import Post from './post.entity'

export interface PostResponse {
	err: number
	msg: string
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: Post[]
}

export interface PostIdResponse {
	err: number
	msg: string
	response: Post
}
