import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { notUnauthorized } from '~/@core/systems/handle_errors'

import dotenv from 'dotenv'
import { ROLE } from '~/systems/other/role.interface'
dotenv.config()

export const generateAccessToken = ({
	userid,
	email,
	role
}: {
	userid: number
	email: string
	role: string
}) => {
	return jwt.sign({ userid, email, role }, process.env.SECRET_KEY as string, {
		expiresIn: '1d'
	})
}

export const generateRefreshToken = ({
	userid,
	email
}: {
	userid: number
	email: string
}) => {
	return jwt.sign({ userid, email }, process.env.SECRET_KEY as string, {
		expiresIn: '7d'
	})
}

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
): Response<any, Record<string, any>> | undefined => {
	const token = req.headers.authorization
	if (!token) return notUnauthorized('Require authorization', res)
	const accessToken = token.split(' ')[1]
	jwt.verify(
		accessToken,
		process.env.SECRET_KEY as jwt.Secret,
		(err: any, decode: any) => {
			if (err) {
				const isChecked = err instanceof TokenExpiredError
				if (!isChecked)
					return notUnauthorized('Access token invalid', res)
				if (isChecked)
					return notUnauthorized('Access token expired', res)
			}
			req.user = decode
			next()
		}
	)
}

export const isShopAdmin = (
	req: any,
	res: Response,
	next: NextFunction
): Response<any, Record<string, any>> | undefined => {
	const { role } = req.user
	if (role !== ROLE.ADMIN)
		return notUnauthorized('Require role shop_Admin', res)
	req.shop = req.user
	next()
}
