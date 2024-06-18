import dotenv from 'dotenv'
dotenv.config()

export default class PaginationSystem {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: any

	constructor(limit: number, currentPage: number) {
		this.offset =
			currentPage && currentPage > 0 ? (currentPage - 1) * limit : 0
		this.limit = limit || Number(process.env.LIMIT) || 10
		this.total = 0
		this.totalPage = 0
		this.currentPage = currentPage
	}

	setTotal(data: any[]): void {
		this.total = data.length ? data[data.length - 1].total : 0 // Lấy giá trị total từ bản ghi cuối cùng
	}
}
