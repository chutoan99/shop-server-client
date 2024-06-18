import Notify from './notify.entity'

export interface NotifyResponse {
	err: number
	msg: string
	total: number
	response: Notify[]
}
