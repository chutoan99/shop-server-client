import { BaseResponse } from '~/systems/other/response.system'
import { CategoryModel } from './category-tree.model'

export interface CategoryResponse extends BaseResponse {
	total: number
	response: CategoryModel[][]
}

export interface SearchCategoryResponse extends BaseResponse {
	total: number
	response: CategoryModel[]
}
