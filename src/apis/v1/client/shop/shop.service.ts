import MESSAGE from '~/@core/contains/message.json'
import ShopRepository from './shop.repository'
import RedisSystem from '~/systems/redis/redis.system'
import { ShopItemsResponse, ShopResponse } from './shop.response'
import _ from 'lodash'
import { LoggerSystem } from '~/systems/logger'
import { PostModel } from '../post/post.model'
import { ShopModel } from './shop.model'

export default class ShopService {
	private readonly _redisSystem: RedisSystem
	private readonly _loggerSystem: LoggerSystem
	private readonly _shopRepository: ShopRepository
  
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._shopRepository = new ShopRepository()
	}

	public FindItems = async (shopid: number): Promise<ShopItemsResponse> => {
		try {
			let total = 0
			const cacheKey: string = `shop-product-${shopid}`
			const cachedData = await this._redisSystem.getCache(cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}

			const response: PostModel[] = await this._shopRepository.findItems(
				shopid
			)
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

	public Find = async (shopid: number): Promise<ShopResponse> => {
		try {
			const cacheKey: string = `shopInfo-${shopid}`
			const cachedData = await this._redisSystem.getCache(cacheKey)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					response: cachedData
				}
			}

			const response: ShopModel = await this._shopRepository.find(shopid)
			if (response) {
				await this._redisSystem.setCache(cacheKey, response)
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
