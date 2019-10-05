import mongoose from "mongoose"
import { Schema } from "mongoose"
import validator from "validator"

const checkSchema = new Schema(
	{
		protocol: {
			type: String,
			required: true,
			minlength: 4,
		},

		URL: {
			type: String,
			required: true,
			validate: validator.isURL,
		},

		successCodes: {
			type: Array,
			required: true,
		},

		method: {
			type: Schema.Types.Mixed,
			default: "",
		},

		reqBody: {
			type: Schema.Types.Mixed,
			default: "",
		},

		request: {
			type: Schema.Types.Mixed,
			default: {},
		},

		response: {
			type: Schema.Types.Mixed,
			default: {},
		},

		timeout: {
			type: String,
			required: true,
		},

		_creator: {
			type: Schema.Types.ObjectId,
			required: true,
		},

		state: {
			type: String,
			default: "down",
		},
	},
	{ minimize: false },
)

export default mongoose.model("check", checkSchema)