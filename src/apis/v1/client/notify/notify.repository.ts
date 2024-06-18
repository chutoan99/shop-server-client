import { BaseDataBase } from '~/systems/dataBase'
import { BaseResponse } from '~/@core/systems/response'
import Notify from './notify.entity'
import { LoggerSystem } from '~/systems/logger'
interface INotifyRepository {
	findAll(): Promise<Notify[]>
}

export default class NotifyRepository implements INotifyRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _baseDataBase: BaseDataBase
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._baseDataBase = new BaseDataBase()
		this._baseDataBase.initDb()
	}
	public findAll = async (): Promise<Notify[]> => {
		try {
			const [response]: BaseResponse = await this._baseDataBase.db.query(
				`SELECT id, image, title, content, userid, seen , time, createdAt, updatedAt  FROM Notifications`
			)

			return response as Notify[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._baseDataBase.closeConnection()
		}
	}
}
