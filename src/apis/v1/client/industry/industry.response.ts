import { BaseResponse } from '~/systems/other/response.system'
import { IndustryModel } from './industry.model'

export interface IndustryInterface extends BaseResponse {
	total: number
	response: IndustryModel[]
}

export interface SearchIndustryInterface extends BaseResponse {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: IndustryModel[]
}
