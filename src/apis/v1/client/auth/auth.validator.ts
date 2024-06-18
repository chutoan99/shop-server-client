import Joi from 'joi'
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto'

export class AuthValidator {
	public Register(payload: RegisterDto) {
		const schema = Joi.object({
			email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
			password: Joi.string().min(6).required(),
			name: Joi.string().required()
		})

		return schema.validate(payload)
	}

	public Login(payload: LoginDto) {
		const schema = Joi.object({
			email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
			password: Joi.string().min(6).required()
		})

		return schema.validate(payload)
	}

  public ForgotPassword(payload: ForgotPasswordDto) {
		const schema = Joi.object({
			email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
		})

		return schema.validate(payload)
	}

  public ResetPassword(payload: ResetPasswordDto) {
		const schema = Joi.object({
			email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
      password: Joi.string().min(6).required(),
			token: Joi.string().required()
		})

		return schema.validate(payload)
	}

  
  
}
