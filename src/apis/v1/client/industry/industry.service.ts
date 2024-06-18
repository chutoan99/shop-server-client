import Industry from './industry.entity'
import MESSAGE from '~/@core/contains/message.json'
import IndustryQuery from './industry.query'
import IndustryRepository from './industry.repository'
import PaginationSystem from '~/systems/pagination/pagination.system'
import _ from 'lodash'
import RedisSystem from '~/systems/redis/redis.system'
import {
	IndustryInterface,
	SearchIndustryInterface
} from './industry.response'
import { LoggerSystem } from '~/systems/logger'

export default class IndustryService {
	private readonly _redisSystem: RedisSystem
	private readonly _loggerSystem: LoggerSystem
	private readonly _industryRepository: IndustryRepository
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._industryRepository = new IndustryRepository()
	}

	public FindAll = async (): Promise<IndustryInterface> => {
		try {
			let total = 0
			const cacheKey: string = 'industry'
			const cachedData = await this._redisSystem.getCache(cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}
			const response: Industry[] =
				await this._industryRepository.findAll()
			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(cacheKey, response)
			}
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Search = async (
		queries: IndustryQuery
	): Promise<SearchIndustryInterface> => {
		try {
			const pagination = new PaginationSystem(queries.limit, queries.page)

			const response: Industry[] = await this._industryRepository.search(
				pagination,
				queries
			)

			pagination.setTotal(response)

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				offset: pagination.offset,
				limit: pagination.limit,
				total: pagination.total,
				totalPage: Math.ceil(pagination.total / pagination.limit),
				currentPage: pagination.currentPage,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
