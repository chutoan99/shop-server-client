import { BaseResponse } from '~/systems/other/response.system'
import  { UserModel } from './user.model'

export default interface UserResponse extends BaseResponse {
	response: UserModel
}
