import passport from "passport"
import Check from "../models/Check"
import User from "../models/User"

export default app => {
	app.post("/api/newCheck", passport.isAuthenticated(), async (req, res) => {
		let { numberOfCheck } = await User.findById(req.user._id)
		if (numberOfCheck >= 10)
			return res.status(413).send("Only 10 can be created")
		
		const { protocol, URL, successCodes, method, reqBody, timeout } = req.body
		const _creator = req.user._id

		console.log(reqBody)
		const check = new Check({
			protocol,
			URL,
			successCodes,
			method,
			reqBody,
			timeout,
			_creator,
		})

		try {
			const newCheck = await check.save()
			numberOfCheck++
			await User.findByIdAndUpdate(req.user._id, { numberOfCheck })
			return res.status(200).send(newCheck)
		}
		catch (err) {
			console.log(err)
			res.status(401).json({ error: "Invalid Credentials" })
		}
	})

	app.get("/api/checks", passport.isAuthenticated(), async (req, res) => {
		const _creator = req.user.id
		try {
			const checks = await Check.find({ _creator })
			res.status(200).json(checks)
		} catch (err) {
			res.status(500).send(err)
		}
	})

	app.patch("/api/checks/:id", passport.isAuthenticated(), async (req, res) => {
		const _creator = req.user._id
		const updatedCheck = req.body

		try {
			const check = await Check.findOne( { _id: req.params.id, _creator })
			if (!check)
				return res.status(500).send()
			
			if(updatedCheck.URL.length < 1 || updatedCheck.successCodes.length === 0)
				throw new Error()
			const newCheck = await Check.findByIdAndUpdate(req.params.id, updatedCheck)
			return res.status(200).send(newCheck)
		} catch (err) {
			return res.status(401).json({error: 'Invalid Credentials' }) 
		}
	})

	app.delete("/api/checks/:id", passport.isAuthenticated(), async (req, res) => {
		const _creator = req.user._id
		let { numberOfCheck } = req.user
		try {
			const check = await Check.findOne({ _id: req.params.id, _creator })
			if (!check)
				return res.status(500).send()

			const deletedCheck = await Check.findOneAndRemove({_id: req.params.id, _creator})

			numberOfCheck--
			await User.findByIdAndUpdate(_creator, { numberOfCheck })

			res.status(200).send(deletedCheck)
		}
		catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})
}