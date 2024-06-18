import Joi from 'joi'
import { v2 as Cloud, UploadApiResponse } from 'cloudinary'
import { image } from '~/helpers/validate'

export default class CloudSystem {
	public validateImage = (file: any) => {
		return Joi.object({ image }).validate({
			image: file.path
		})
	}

	public deleteFile = async (filename: string) => {
		Cloud.uploader.destroy(filename)
	}

	public uploadFiles = async (files: any[]): Promise<string[]> => {
		const imageUrls: string[] = []
		const uniqueFiles = new Set(files)
		console.log(uniqueFiles, 'uniqueFiles')
		await Promise.all(
			Array.from(uniqueFiles).map(async (file: any) => {
				const result: UploadApiResponse = await Cloud.uploader.upload(
					file.path
				)
				console.log(result, 'resultresult')
				imageUrls.push(result.secure_url)
			})
		)
		return imageUrls
	}
}
