import MESSAGE from '~/@core/contains/message.json'
import { formatShopMall } from './shop-mall.helper'
import ShopMallRepository from './shop-mall.repository'
import RedisSystem from '~/systems/redis/redis.system'
import _ from 'lodash'
import { ShopMallResponse } from './shop-mall.response'
import { LoggerSystem } from '~/systems/logger'
import { ShopMallModel } from './shop-mall.model'
export default class ShopMallService {
	protected cacheKey: string = 'shop-mall'
	private readonly _redisSystem: RedisSystem
	private readonly _loggerSystem: LoggerSystem
	private readonly _shopMallRepository: ShopMallRepository

	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._shopMallRepository = new ShopMallRepository()
	}

	public FindAll = async (): Promise<ShopMallResponse> => {
		try {
			let total = 0
			const cachedData = await this._redisSystem.getCache(this.cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: formatShopMall(cachedData)
				}
			}
			const response: ShopMallModel[] | [] =
				await this._shopMallRepository.findAll()

			if (_.isArray(response)) {
				total = response.length
				await this._redisSystem.setCache(this.cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: formatShopMall(response)
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
