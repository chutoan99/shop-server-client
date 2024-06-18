import User from './user.entity'

export default interface UserResponse {
	err: number
	msg: string
	response: User
}
