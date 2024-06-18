import WriteLogger from '~/configs/winston'

export class LoggerSystem {
	public error = (err: any) => {
		WriteLogger.log({
			level: 'error',
			message: err.message
		})
	}
}
