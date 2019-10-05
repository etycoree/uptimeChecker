import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import bcrypt from "bcrypt"
import User from "../models/User"

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id)
		done(null, user)
	}
	catch (err) {
		return done(err)
	}
})

const isAuthenticated = () => {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		res.status(403).send()
	}
}

const setPassportStrategy = () => {
	passport.use(
		new LocalStrategy(
			{ usernameField: "phoneNumber" },
			async (phoneNumber, password, done) => {
				try {
					const user = await User.findOne({ phoneNumber })
					if (!user)
						return done(null, false)
					const isValid = await bcrypt.compare(password, user.password)
					if (!isValid)
						return done(null, false)
					
					return done(null, user);
				}
				catch (err) {
					done(err)
				}
			})
	)

	passport.isAuthenticated = isAuthenticated
}

export default setPassportStrategy