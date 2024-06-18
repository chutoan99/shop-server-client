import Room from './room.entity'

export interface RoomResponse {
	err: number
	msg: string
	total: number
	response: Room[]
}
