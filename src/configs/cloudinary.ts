import { v2 as cloudinary, ConfigOptions } from 'cloudinary'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'
import multer, { Multer } from 'multer'

import dotenv from 'dotenv'

dotenv.config()
const cloudConfig: ConfigOptions = {
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
}

cloudinary.config(cloudConfig)
const storageOptions: Options = {
	cloudinary,
	params: async () => {
		return {
			folder: 'shopee',
			allowedFormats: ['jpg', 'png']
		}
	}
}
const storage = new CloudinaryStorage(storageOptions)
const uploadCloud: Multer = multer({ storage })
export default uploadCloud
