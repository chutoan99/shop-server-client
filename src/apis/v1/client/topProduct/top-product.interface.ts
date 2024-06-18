import TopProduct from './top-product.entity'

export interface TopProductResponse {
	err: number
	msg: string
	total: number
	response: TopProduct[]
}
