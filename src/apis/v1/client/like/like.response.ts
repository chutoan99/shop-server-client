import Like from './like.entity'

export default interface LikeResponse {
	err: number
	msg: string
	total: number
	response: Like[]
}
