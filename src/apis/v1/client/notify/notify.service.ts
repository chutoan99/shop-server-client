import MESSAGE from '~/@core/contains/message.json'

import NotifyRepository from './notify.repository'
import Notify from './notify.entity'
import { NotifyResponse } from './notify.interface'
import RedisSystem from '~/systems/redis/redis.system'
import { LoggerSystem } from '~/systems/logger'
import _ from 'lodash'

export default class NotifyService {
	protected cacheKey: string = 'notify'
	private readonly _redisSystem: RedisSystem
	private readonly _loggerSystem: LoggerSystem
	private readonly _notifyRepository: NotifyRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._redisSystem = new RedisSystem()
		this._notifyRepository = new NotifyRepository()
	}

	FindAll = async (): Promise<NotifyResponse> => {
		try {
			const cachedData = await this._redisSystem.getCache(this.cacheKey)

			if (cachedData) {
				return {
					err: 0,
					msg: MESSAGE.GET.SUCCESS,
					total: cachedData.length,
					response: cachedData
				}
			}

			const response: Notify[] | [] =
				await this._notifyRepository.findAll()
			let total = 0
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
