import MESSAGE from '~/@core/contains/message.json'

import FlashSaleRepository from './flash-sale.repository'
import { FlashSaleResponse } from './flash-sale.response'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import { FlashSaleModel } from './flash-sale.model'
import _ from 'lodash'
export default class FlashSaleService {
	protected cacheKey: string = 'flash-sale'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _flashSaleRepository: FlashSaleRepository
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._flashSaleRepository = new FlashSaleRepository()
	}

	public FindAll = async (): Promise<FlashSaleResponse> => {
		try {
			const cachedData = await this._redisSystem.getCache(this.cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
          total: _.size(cachedData),
					response: cachedData
				}
			}

			const response: FlashSaleModel[] =
				await this._flashSaleRepository.findAll()
			if (_.isArray(response)) {
				await this._redisSystem.setCache(this.cacheKey, response)
			}
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
        total: _.size(response),
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
