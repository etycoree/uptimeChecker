import mongoose from "mongoose"
import { Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			minlength: 2,
		},
	
		lastName: {
			type: String,
			required: true,
			minlength: 2,
		},
	
		phoneNumber: {
			type: String,
			required: true,
			validate: {
				validator(v) {
					return /\d{10}/.test(v)
				},
				message: "{VALUE} is not a valid phone number!",
			},
			unique: true,
		},
	
		password: {
			type: String,
			required: true,
			minlength: 4,
		},
	
		numberOfCheck: {
			type: Number,
			default: 0,
		},
	}
)

userSchema.methods.toJSON = function() {
	const obj = this.toObject()
	delete obj.password
	return obj
}

userSchema.methods.comparePasswords = (password, hash) => bcrypt.compare(password, hash, (err, res) => res)

userSchema.pre("save", function(next) {
	const user = this
	const saltRounds = 10
	if(!user.isModified("password"))
		return next()

	bcrypt.hash(user.password, saltRounds)
		.then(hash => {
			user.password = hash
			next()
		})
		.catch(err => next(err))
})

export default mongoose.model("User", userSchema)
