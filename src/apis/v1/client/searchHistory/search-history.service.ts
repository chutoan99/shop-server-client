import MESSAGE from '~/@core/contains/message.json'
import SearchHistoryRepository from './search-history.repository'
import { Builder } from 'builder-pattern'
import { SearchHistoryResponse } from './search-history.response'
import { LoggerSystem } from '~/systems/logger'
import { BaseResponse } from '~/systems/other/response.system'
import { SearchHistoryModel } from './search-history.model'
import { CreateSearchHistoryDto } from './search-history.dto'
import _ from 'lodash'

export default class SearchHistoryService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _searchHistoryRepository: SearchHistoryRepository

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._searchHistoryRepository = new SearchHistoryRepository()
	}

	public FindAll = async (userid: number): Promise<SearchHistoryResponse> => {
		try {
			const response: SearchHistoryModel[] =
				await this._searchHistoryRepository.findAll(userid)

			if (_.isArray(response)) {}

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

	public Create = async (
		payload: CreateSearchHistoryDto,
		userid: number
	): Promise<BaseResponse> => {
		try {
			const newSearch = Builder<SearchHistoryModel>()
				.userid(userid)
				.text(payload.text)
				.build()

			const isCreated: boolean =
				await this._searchHistoryRepository.create(newSearch)

			if (!isCreated) {
				return {
					err: 1,
					msg: MESSAGE.CREATE.FAIL
				}
			}
			return {
				err: 0,
				msg: MESSAGE.CREATE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
