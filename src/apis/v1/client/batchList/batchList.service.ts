import MESSAGE from '~/@core/contains/message.json'

import BatchList from './batchList.entity'
import BatchListRepository from './batchList.repository'
import { BatchListResponse } from './batchList.interface'
import RedisSystem from '~/systems/redis/redis.system'
import _ from 'lodash'
import { LoggerSystem } from '~/systems/logger'

export default class BatchListService {
	protected cacheKey: string = 'batchList'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _batchListRepository: BatchListRepository

	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._batchListRepository = new BatchListRepository()
	}

	public FindAll = async (): Promise<BatchListResponse> => {
		try {
			let total = 0
			const cachedData: BatchList[] = await this._redisSystem.getCache(
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
			const response: BatchList[] =
				await this._batchListRepository.findAll()

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
