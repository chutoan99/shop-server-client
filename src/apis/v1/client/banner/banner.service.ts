import MESSAGE from '~/@core/contains/message.json'
import BannerRepository from './banner.repository'
import { BannerResponse } from './banner.response'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import _ from 'lodash'
import { BannerModel } from './banner.model'
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
			const cachedData: BannerModel[] = await this._redisSystem.getCache(
				this.cacheKey
			)
			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
          total: _.size(cachedData),
					response: cachedData
				}
			}

			const response: BannerModel[] =
				await this._bannerRepository.findAll()

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
