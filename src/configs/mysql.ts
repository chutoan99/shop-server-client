import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connectMySQL = () => {
	const pool = mysql.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_NAME,
		port: Number(process.env.MYSQL_PORT),
		connectionLimit: 10
	})
	return pool
}

export default connectMySQL
