import Category from './category-tree.entity'

export interface CategoryResponse {
	err: number
	msg: string
	total: number
	response: Category[][]
}

export interface SearchCategoryResponse {
	err: number
	msg: string
	total: number
	response: Category[]
}
