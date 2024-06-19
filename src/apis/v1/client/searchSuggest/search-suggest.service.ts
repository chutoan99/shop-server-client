import MESSAGE from '~/@core/contains/message.json'
import SearchSuggestRepository from './search-suggest.repository'
import RedisSystem from '~/systems/redis/redis.system'
import _ from 'lodash'
import { SearchSuggestResponse } from './search-suggest.response'
import { LoggerSystem } from '~/systems/logger'
import { SearchSuggestModel } from './search-suggest.model'

export default class SearchSuggestService {
	protected cacheKey: string = 'search-suggest'
	private readonly _loggerSystem: LoggerSystem
	private readonly _redisSystem: RedisSystem
	private readonly _searchSuggestRepository: SearchSuggestRepository
  
	constructor() {
		this._redisSystem = new RedisSystem()
		this._loggerSystem = new LoggerSystem()
		this._searchSuggestRepository = new SearchSuggestRepository()
	}

	public FindAll = async (): Promise<SearchSuggestResponse> => {
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
			const response: SearchSuggestModel[] =
				await this._searchSuggestRepository.findAll()

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
