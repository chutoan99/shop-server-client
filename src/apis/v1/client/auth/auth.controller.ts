import { Request, Response } from 'express'
import joi from 'joi'
import AuthService from './auth.service'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import { internalServerError, badRequest } from '~/@core/systems/handle_errors'
import { AuthValidator } from './auth.validator'
import {
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto
} from './auth.dto'
class AuthClientController {
	private readonly _authService: AuthService
	private readonly _authValidator: AuthValidator

	constructor() {
		this._authService = new AuthService()
		this._authValidator = new AuthValidator()
	}

	public Register = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: RegisterDto = req.body
			const { error } = this._authValidator.Register(payload)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.Register(payload)

			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Login = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: LoginDto = req.body
			const { error }: { error: joi.ValidationError | undefined } =
				this._authValidator.Login(payload)

			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.Login(payload)
			if ('refresh_token' in response) {
				// Set cookie for refresh token
				res.cookie('refreshToken', response.refresh_token, {
					httpOnly: true,
					maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
				})

				delete response.refresh_token
			}
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public ForgotPassword = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const params: ForgotPasswordDto = req.query
			const { error } = this._authValidator.ForgotPassword(params)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.ForgotPassword(req.query)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public ResetPassword = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const payload: ResetPasswordDto = req.body

			const { error } = this._authValidator.ForgotPassword(payload)
			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.ResetPassword(payload)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public RefreshAccessToken = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const cookie = req.cookie
			if (!cookie && !cookie.refreshToken)
				throw new Error('No refresh token in cookies')
			const response = await this._authService.RefreshAccessToken(cookie)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Logout = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const cookie = req.cookies
			if (!cookie || !cookie.refreshToken)
				throw new Error('No refresh token in cookies')
			const response = await this._authService.Logout(cookie)
			res.clearCookie('refreshToken', {
				httpOnly: true,
				secure: true
			})
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new AuthClientController()
