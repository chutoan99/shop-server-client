import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt, { JwtPayload } from 'jsonwebtoken'
import sendEmail from '~/middleWares/sendEmail'
import templateResetPassword from '~/templates/reset'
import { generateAccessToken, generateRefreshToken } from '~/middleWares/jwt'
import User from '../user/user.entity'
import MESSAGE from '~/@core/contains/message.json'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import UserRepository from '../user/user.repository'
import UserService from '../user/user.service'
import { generateShopId, generateUserId } from '~/helpers/generateId'
import { ROLE } from '~/systems/other/role.interface'
import AuthRepository from './auth.repository'
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto'
import { WriteResponse } from '~/systems/other/response.system'
import { loginResponse } from './auth.response'
import { LoggerSystem } from '~/systems/logger'
export default class AuthService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _userRepository: UserRepository
	private readonly _authRepository: AuthRepository
	private readonly _userService: UserService
  
	constructor() {
		this._userService = new UserService()
		this._userRepository = new UserRepository()
		this._authRepository = new AuthRepository()
		this._loggerSystem = new LoggerSystem()
	}
	protected hashPassWord = (password: string) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
	}

	//* B1: Kiểm tra email đã tồn tại hay chưa
	//* B2: Tạo User
	public Register = async (payload: RegisterDto): Promise<WriteResponse> => {
		try {
			const checkResult = await this._userService.checkExistUser(
				payload.email
			)
			if (checkResult) {
				return checkResult
			}
			const user: User = Builder<User>()
				.id(generateUserId())
				.shopid(generateShopId())
				.email(payload?.email)
				.name(payload?.name)
				.sex(0)
				.phone(0)
				.role(ROLE.CLIENT)
				.password(this.hashPassWord(payload?.password))
				.build()

			const created: boolean = await this._userRepository.createUser(user)
			if (created) {
				return {
					err: 0,
					msg: MESSAGE.REGISTER.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.REGISTER.FAILED
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1 KIỂM TRA MẬT KHẨU ĐÚNG HAY KHÔNG
	//* B2 TẠO ACCESS_TOKEN (Xác thực người dùng, quân quyên người dùng) VÀ REFRESH_TOKEN()
	//* B3 LƯU REFRESH_TOKEN VÀO DB VÀ COOKIE
	public Login = async (payload: LoginDto) : Promise<loginResponse | WriteResponse>=> {
		try {
			const user: User = await this._userRepository.findUser(
				payload?.email
			)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const isHashedPassword = bcrypt.compareSync(
				payload?.password.toString(),
				user.password.toString()
			)

			if (isHashedPassword) {
				const accessToken: string = generateAccessToken({
					userid: user.id,
					email: user.email,
					role: user.role
				})
				const newRefreshToken: string = generateRefreshToken({
					userid: user.id,
					email: user.email
				})

				await this._authRepository.updateRefreshToken(
					user,
					newRefreshToken
				)

				return {
					err: 0,
					msg: MESSAGE.LOGIN.SUCCESS,
					access_token: accessToken,
					refresh_token: newRefreshToken
				}
			} else {
				return {
					err: 2,
					msg: MESSAGE.EMAIL.WRONG_CREDENTIALS,
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Client gửi email
	//* B2: Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
	//* B3: Client check mail => click link
	//* B4: Client gửi api kèm token
	//* B5: Check token có giống với token mà server gửi mail hay không
	//* B6: Change password
	public ForgotPassword = async (payload: ForgotPasswordDto) => {
		try {
			const user: User = await this._userRepository.findUser(
				payload?.email
			)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}
			const resetToken: string = crypto.randomBytes(32).toString('hex')
			const passwordResetExpires: number = Date.now() + 15 * 60 * 1000
			const passwordResetToken = crypto
				.createHash('sha256')
				.update(resetToken)
				.digest('hex')

			const idUpdated: boolean = await this._authRepository.updateToken(
				user.email,
				passwordResetToken,
				passwordResetExpires
			)

			if (idUpdated) {
				const result: any = await sendEmail(
					user?.email,
					templateResetPassword(user?.email, resetToken)
				)
				return {
					err: result ? 0 : 2,
					msg: 'ok',
					response: result ? result : null
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Check thời gian token còn hạn hay không
	//* B2: Kiểm tra thời gian lưu trong db và thời gian thực xem tojen có hết hạn hay chưa
	public ResetPassword = async (payload: ResetPasswordDto) => {
		try {
			const user: User = await this._userRepository.findUser(
				payload?.email
			)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const passwordResetToken = crypto
				.createHash('sha256')
				.update(payload?.token)
				.digest('hex')

			if ((user.passwordResetExpires as any) - Date.now() <= 0) {
				return {
					err: 2,
					msg: MESSAGE.TOKEN.EXPIRE
				}
			}

			const newPassword = this.hashPassWord(payload?.password)

			const idUpdated: boolean = await this._authRepository.resetPassword(
				payload?.email,
				newPassword
			)

			if (idUpdated) {
				return {
					err: 0,
					msg: MESSAGE.USER.UPDATED_PASSWORD_SUCCESS
				}
			} else {
				return {
					err: 2,
					msg: MESSAGE.EMAIL.WRONG_CREDENTIALS
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	//* B1: Check xem có token hay không
	//* B2: Check refreshToken và trong db có giống nhau hay không, nếu giống thì tạo newAccessToken
	public RefreshAccessToken = async (cookie: any) => {
		const decode = jwt.verify(
			cookie.refreshToken,
			process.env.SECRET_KEY as jwt.Secret
		) as JwtPayload

		const user: User =
			await this._authRepository.findUserRefreshAccessToken(
				decode?.userid,
				cookie.refreshToken
			)
		if (!user) {
			return {
				err: 2,
				msg: MESSAGE.USER.NOT_FOUND
			}
		}
		const newAccessToken: string = generateAccessToken({
			userid: user.id,
			email: user.email,
			role: user.role
		})

		return {
			err: 0,
			msg: MESSAGE.TOKEN.CREATED,
			accessToken: newAccessToken
		}
	}

	public Logout = async (cookie: any) => {
		try {
			//* Xóa refresh token ở db
			const decode = jwt.verify(
				cookie.refreshToken,
				process.env.SECRET_KEY as jwt.Secret
			) as JwtPayload
			const isLoggedOut: boolean = await this._authRepository.logout(
				decode?.userid
			)

			if (isLoggedOut) {
				return {
					err: 0,
					msg: MESSAGE.LOGOUT.DONE
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
