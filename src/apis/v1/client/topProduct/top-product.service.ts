import MESSAGE from '~/@core/contains/message.json'
import TopProductRepository from './top-product.repository'
import TopProduct from './top-product.entity'
import { TopProductResponse } from './top-product.response'
import RedisSystem from '~/systems/redis/redis.system'
import _ from 'lodash'
import { LoggerSystem } from '~/systems/logger'

export default class TopProductService {
	protected cacheKey: string = 'top-product'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _topProductRepository: TopProductRepository
  
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._redisSystem = new RedisSystem()
		this._topProductRepository = new TopProductRepository()
	}

	public FindAll = async (): Promise<TopProductResponse> => {
		try {
			let total = 0
			const cachedData = await this._redisSystem.getCache(this.cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}
			const response: TopProduct[] =
				await this._topProductRepository.findAll()

			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(this.cacheKey, response)
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
}
