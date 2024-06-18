import ShopMall from './shop-mall.entity'

export interface ShopMallResponse {
	err: number
	msg: string
	total: number
	response: ShopMall[][]
}
