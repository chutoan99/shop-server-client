import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import SearchSuggest from './search-suggest.entity'
import { LoggerSystem } from '~/systems/logger'
interface ISearchSuggestRepository {
	findAll(): Promise<SearchSuggest[]>
}
export default class SearchSuggestRepository
	implements ISearchSuggestRepository
{
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<SearchSuggest[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, text, count, createdAt, updatedAt  FROM SearchSuggestions`
			)

			return response as SearchSuggest[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
