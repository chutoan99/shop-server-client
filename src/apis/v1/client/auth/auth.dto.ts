export interface RegisterDto {
	name: string
	email: string
	password: string
}

export interface LoginDto {
	name: string
	email: string
	password: string
}

export interface ForgotPasswordDto {
	email: string
}

export interface ResetPasswordDto {
	email: string
  password: string
	token: string
}
