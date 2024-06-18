import MESSAGE from '~/@core/contains/message.json'
import Banner from './banner.entity'
import BannerRepository from './banner.repository'
import { BannerResponse } from './banner.interface'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import _ from 'lodash'
export default class BannerService {
	protected cacheKey: string = 'banner'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _bannerRepository: BannerRepository

	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._bannerRepository = new BannerRepository()
	}

	public FindAll = async (): Promise<BannerResponse> => {
		try {
			let total = 0
			const cachedData: Banner[] = await this._redisSystem.getCache(
				this.cacheKey
			)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}

			const response: Banner[] = await this._bannerRepository.findAll()
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
