const express = require('express')
const router = express.Router()
import passport from 'passport'
import AuthClientController from './auth.controller'
import sendEmail from '~/middleWares/sendEmail'
require('dotenv').config()

router.post('/register', AuthClientController.Register, sendEmail)
router.post('/login', AuthClientController.Login)
router.post('/forgotPassword', AuthClientController.ForgotPassword)
router.put('/resetPassword', AuthClientController.ResetPassword)
router.post('/refreshToken', AuthClientController.RefreshAccessToken)
router.get('/logout', AuthClientController.Logout)
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
)
router.get('/google/callback', passport.authenticate('google'))
router.get('/facebook', passport.authenticate('facebook'))
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

export default router
