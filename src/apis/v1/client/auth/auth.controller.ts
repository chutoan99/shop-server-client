import { Request, Response } from 'express'
import joi from 'joi'
import AuthService from './auth.service'
import { email, password, token } from '~/helpers/validate'

import STATUS_CODE from '~/@core/contains/statusCode.json'
import { internalServerError, badRequest } from '~/@core/systems/handle_errors'
class AuthClientController {
	private readonly _authService: AuthService
	constructor() {
		this._authService = new AuthService()
	}

	public Register = async (
		req: any,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const { error }: { error: joi.ValidationError | undefined } = joi
				.object({ email, password })
				.validate({
					email: req.body.email,
					password: req.body.password
				})

			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.Register(req.body)

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
			const { error }: { error: joi.ValidationError | undefined } = joi
				.object({ email, password })
				.validate({
					email: req.body.email,
					password: req.body.password
				})

			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.Login(req.body)
			res.cookie('refreshToken', response.refresh_token, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000
			})
			delete response.refresh_token
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
			const { error }: { error: joi.ValidationError | undefined } = joi
				.object({ email })
				.validate({
					email: req.query.email
				})
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
			const { error }: { error: joi.ValidationError | undefined } = joi
				.object({ email, password, token })
				.validate({
					email: req.body.email,
					password: req.body.password,
					token: req.body.token
				})

			if (error) return badRequest(error.details[0]?.message, res)

			const response = await this._authService.ResetPassword(req.body)
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

	public LoginGoogle = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			res.redirect('/')
		} catch (error) {
			return internalServerError(res)
		}
	}

	public LoginFacebook = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>> | undefined> => {
		try {
			res.redirect('/')
		} catch (error) {
			return internalServerError(res)
		}
	}
}

export default new AuthClientController()
