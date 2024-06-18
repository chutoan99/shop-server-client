import {
	Strategy as GoogleStrategy,
	Profile as GoogleProfile
} from 'passport-google-oauth20'
import {
	Strategy as FacebookStrategy,
	Profile as FacebookProfile
} from 'passport-facebook'
import passport from 'passport'

export function loginGoogle() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID || '',
				clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
				callbackURL: `${process.env.URL_BACKEND}/api/v1/client/auth/google/callback`
			},
			(accessToken) => {
				console.log(accessToken, 'cscscs')
			}
		)
	)
}

export function loginFaceBook() {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID || '',
				clientSecret: process.env.FACEBOOK_APP_ID || '',
				callbackURL: `${process.env.URL_BACKEND}/api/v1/client/auth/facebook/callback`
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: FacebookProfile,
				cb: (error: any, user?: any) => void
			) => {
				try {
					console.log(profile.id, 'profile.id')
					// const [user, created] = await db.User.findOrCreate({
					// 	where: { facebookId: profile.id }
					// })
					const user = null
					return cb(null, user)
				} catch (error) {
					return cb(error)
				}
			}
		)
	)
}
