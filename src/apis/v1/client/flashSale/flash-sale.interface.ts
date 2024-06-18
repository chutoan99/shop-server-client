import FlashSale from './flash-sale.entity'

export interface FlashSaleResponse {
	err: number
	msg: string
	total: number
	response: FlashSale[]
}
