import MESSAGE from '~/@core/contains/message.json'
import SearchHistoryRepository from './search-history.repository'
import SearchHistory from './search-history.entity'
import { Builder } from 'builder-pattern'
import { SearchHistoryResponse } from './search-history.interface'
import { LoggerSystem } from '~/systems/logger'
import { WriteResponse } from '~/systems/other/response.system'

export default class SearchHistoryService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _searchHistoryRepository: SearchHistoryRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._searchHistoryRepository = new SearchHistoryRepository()
	}

	public FindAll = async (userid: number): Promise<SearchHistoryResponse> => {
		try {
			const response: SearchHistory[] =
				await this._searchHistoryRepository.findAll(userid)

			let total = 0

			if (Array.isArray(response)) {
				total = response.length
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

	public Create = async (
		payload: SearchHistory,
		userid: number
	): Promise<WriteResponse> => {
		try {
			const newSearch = Builder<SearchHistory>()
				.userid(userid)
				.text(payload.text)
				.build()

			const isCreated: boolean =
				await this._searchHistoryRepository.create(newSearch)
			if (isCreated) {
				return {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.CREATE.FAIL
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
