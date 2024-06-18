import BatchList from './batchList.entity'

export interface BatchListResponse {
	err: number
	msg: string
	total: number
	response: BatchList[]
}
