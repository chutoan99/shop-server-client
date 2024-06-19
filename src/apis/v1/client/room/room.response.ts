import { BaseResponse } from '~/systems/other/response.system'
import { RoomModel } from './room.model'

export interface RoomResponse extends BaseResponse {
	total: number
	response: RoomModel[]
}
