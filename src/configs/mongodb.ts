import mongoose from 'mongoose'
import dotenv from 'dotenv'
import WriteLogger from './winston'
dotenv.config()

const connectMongoDB = () => {
	try {
		const connectionString = process.env.MONGODB_CONNECT
		if (!connectionString) {
			throw new Error('MongoDB connection string is missing.')
		}
		const options: any = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
		mongoose.connect(connectionString, options)
		console.log('Connection to Mongo database successful.')
	} catch (error: any) {
		WriteLogger.log({
			level: 'error',
			message: error.message
		})
		console.error('Could not connect:', error.message)
	}
}
export default connectMongoDB
