import BaseModel from '~/systems/other/baseMode.system'

export interface UserModel extends BaseModel {
	id: number
	shopid: number
	username: string
	email: string
	sex: number
	role: string
	password: string
	name: string
	address: string
	birthday: Date
	phone: number
	filename: string
	not_new_user: boolean
	refreshToken: string
	passwordResetToken: string
	passwordResetExpires: string
	passwordChangedAt: string
	avatar: string
}
