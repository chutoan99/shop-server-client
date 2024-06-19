import MESSAGE from '~/@core/contains/message.json'
import CategoriesRepository from './category-tree.repository'
import { formatCategory } from './category-tree.helper'
import _ from 'lodash'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import {
	SearchCategoryResponse,
	CategoryResponse
} from './category-tree.response'
import { CategoryModel } from './category-tree.model'

export default class CategoriesTreeService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _categoriesRepository: CategoriesRepository
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._categoriesRepository = new CategoriesRepository()
	}

	public FindAll = async (level: number): Promise<CategoryResponse> => {
		try {
			let total = 0

			const cacheKey: string = `category-tree-${level}`
			const cachedData = await this._redisSystem.getCache(cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: formatCategory(cachedData)
				}
			}

			const response: CategoryModel[] =
				await this._categoriesRepository.findAll(level)

			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: formatCategory(response)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Search = async (catid: number): Promise<SearchCategoryResponse> => {
		try {
			let total = 0
			const cacheKey: string = `category-tree-${catid}`
			const cachedData = await this._redisSystem.getCache(cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}

			const response: CategoryModel[] =
				await this._categoriesRepository.search(catid)

			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: response as CategoryModel[]
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
