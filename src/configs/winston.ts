const path = require('path')
import winston from 'winston'
import { getCurrentDate } from '~/helpers/date'
const DailyRotateFile = require('winston-daily-rotate-file')
const fs = require('fs')

const logDirectory = path.join(__dirname, '../../log', getCurrentDate())

// Tạo thư mục nếu nó không tồn tại
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory, { recursive: true })
}
const WriteLogger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.colorize(),
		winston.format.errors({ stack: true }),
		winston.format.printf((log: winston.Logform.TransformableInfo) => {
			if (log.stack)
				return `[${log.timestamp}] [${log.level}] ${log.stack}`
			return `[${log.timestamp}] [${log.level}] ${log.message}`
		})
	),
	transports: [
		new winston.transports.Console(),
		new DailyRotateFile({
			filename: path.join(logDirectory, 'logfile-%DATE%.log'), // Đường dẫn và tên file log
			datePattern: 'YYYY-MM-DD', // Định dạng ngày tháng
			zippedArchive: true, // Nén file log cũ sau khi xoá
			maxSize: '20m', // Kích thước tối đa của file log (ở đây là 20MB)
			maxFiles: '14d' // Số ngày giữ lại file log (ở đây là 14 ngày)
		})
	]
})

export default WriteLogger

//* level: cho phép ta sử dụng log đối với các mức level nhỏ hơn hoặc bằng level được thiết lập dựa trên thứ tự levels đã được quy định.
//* levels: mặc định winston.config.npm.levels là các levels mặc định đã được thiết lập sẵn với màu sắc tương ứng. Ta có thể tự custom các levels log và màu sắc của các level
//* transport: Thiết lập cách thức log của logger.
//* format: cho phép điều chỉnh thiết lập định dạng của log.
