import passport from "passport"
import bcrypt from "bcrypt"
import User from "../models/User"

export default app => {
	app.post("/api/signup", async (req, res) => {
		console.log(req.body);
		const { firstName, lastName, phoneNumber, password } = req.body
		const user = new User({
			firstName,
			lastName,
			phoneNumber,
			password,
		})
		try {
			const newUser = await user.save()
			return res.json(newUser)
		}
		catch (err) {
			console.log(err)
			if(err.code == 11000)
				return res.status(409).json({ error: "User with this phone already exists"})
			
			return res.status(401).json({ error: "Invalid Credentials"})
		}
	})

	app.post("/api/login", passport.authenticate("local"), async (req, res) => {
		const user = await User.findById(req.user._id)
		return res.send(user)
	})

	app.get("/api/current_user", passport.isAuthenticated(), async (req, res) => {
		try {
			const user = await User.findOne({ phoneNumber: req.user.phoneNumber })
			const objUser = user.toObject()
			delete objUser.password
			return res.send(objUser)
		}
		catch (err) {
			console.log(err)
			return res.status(404).json({ error: "Not Found" })
		}
	})

	app.get("/api/logout", passport.isAuthenticated(), (req, res) => {
		req.logout()
		return res.redirect('/')
	})

	app.patch("/api/user", passport.isAuthenticated(), async (req, res) => {
		const { firstName, lastName, phoneNumber, _id } = req.body

		try {
			const
				isUserExist = await User.find({ phoneNumber }),
				user = await User.findById(_id)

			if (firstName.length < 1 || lastName.length < 1)
				throw new Error()
			
			if ((Object.keys(isUserExist).length != 0) && (user.phoneNumber != phoneNumber))
				throw ({ isUserExist: true})

			await User.findByIdAndUpdate(req.user._id, { phoneNumber, firstName, lastName })
			return res.status(200).send()
		}
		catch (err) {
			console.log(err)
			if(err.isUserExist)
				return res.status(409).json({ error: "User with this phone already exist" })
			return res.status(401).json({ error: "Invalid credentials "})
		}
	})

	app.patch("/api/user_password", passport.isAuthenticated(), async (req, res) => {
		const { lastPassword, newPassword } = req.body
		try {
			const { password } = await User.findById(req.user._id)
			const result = await bcrypt.compare(lastPassword, password)
			if (!result)
				return res.status(400).send("Password don't match...")

			const saltRounds = 10
			const hash = await bcrypt.hash(newPassword, saltRounds)
			await User.findByIdAndUpdate(req.user._id, { password: hash })
			return res.status(200).json({success: true})
		} catch (err) {
			console.log(err)
			return res.status(401).json({ errors: "Passwords don't match" })
		}
	})

	app.delete('/api/delete_user', passport.isAuthenticated(), async (req, res) => {
		try {
			await User.findByIdAndRemove(req.user._id)
			return res.status(200).redirect('/')
		} catch (err) {
			console.log(err)
			return res.status(500).send()
		}
	})
}