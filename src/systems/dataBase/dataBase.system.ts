import { PoolConnection } from 'mysql2/promise'
import MESSAGE from '~/@core/contains/message.json'
import WriteLogger from '~/configs/winston'
import connectMySQL from '~/configs/mysql'
export class BaseDataBase {
	public db!: PoolConnection
	public async initDb() {
		try {
			const pool = await connectMySQL()
			this.db = await pool.getConnection()
		} catch (error: any) {
			WriteLogger.log({
				level: 'error',
				message: error.message
			})
			throw (MESSAGE.DB.INVALID_RESPONSE, error.message)
		}
	}

	public async closeConnection(): Promise<void> {
		if (this.db) {
			await this.db.release()
		}
	}
}
