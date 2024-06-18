import Industry from './industry.entity'

export interface IndustryInterface {
	err: number
	msg: string
	total: number
	response: Industry[]
}

export interface SearchIndustryInterface {
	err: number
	msg: string
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: Industry[]
}
