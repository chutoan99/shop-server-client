import Banner from './banner.entity'
export interface BannerResponse {
	err: number
	msg: string
	total: number
	response: Banner[]
}
