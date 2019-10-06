import axios from "axios"
import User from "../models/User"
import Check from "../models/Check"
import sendSMS from './sendSMS'

function loop() {
	setInterval(makeRequest, 1000 * 30)
}

function setReqParams(check) {
	const { protocol, URL, method, timeout, reqBody } = check
	let parsedReqBody
	try {
		parsedReqBody = JSON.parse(reqBody)
	}
	catch (err) {
		parsedReqBody = {}
	}

	return {
		url: `${protocol}://${URL}`,
		method: method.toLowerCase(),
		timeout: timeout * 1000,
		data: parsedReqBody,
	}
}

async function saveRequestDetails(id, request) {
	await Check.findByIdAndUpdate(id, { request })
}

async function saveResponseDetails(id, response) {
	delete response.request
	delete response.config
	delete response.data
	await Check.findByIdAndUpdate(id, { response })
}

async function makeRequest() {
	let checks = [];
	try {
		checks = await Check.find({})
	}
	catch (err) {
		console.log(err)
	}
	checks.map(async check => {
		let response
		try {
			response = await axios(setReqParams(check))
			console.log(`${check._id}: URL: ${check.URL} STATUS_CODE=${response.status}\n`)
		}
		catch (err) {
			response = err.response ? err.response : { message: `timeout of ${check.timeout}s exceeded` }
			console.log(`${check._id}: URL: ${check.URL} ERROR: ${err}\n`)
		}

		await saveAndSendSMS(check, response)
	})
}

async function saveAndSendSMS(check, response) {
		try {
			const
				user = await User.findById(check._creator),
				phoneNumber = `+7${user.phoneNumber}`
			
			let smsBody;

			await saveRequestDetails(check._id, (response ? response.config : {}))
			await saveResponseDetails(check._id, (response ? response : {}))
			if(check.successCodes.indexOf(response.status) > -1 && check.state === "down")
			{
				await Check.findByIdAndUpdate(check._id, { state: 'up' })
				smsBody = `
					Check:
						URL: ${check.URL}
						Status Code: ${response.status}
						State: UP
				`
				sendSMS(phoneNumber, smsBody)
			}
			if(check.successCodes.indexOf(response.status) === -1 && check.state === "up")
			{
				await Check.findByIdAndUpdate(check._id, { state: 'down' })
				smsBody = `
					Check
						URL: ${check.URL}
						Status Code: ${response.status}
						State: DOWN
				`
				sendSMS(phoneNumber, smsBody)
			}
		}
		catch (err) {
			console.log(err)
		}
}

function init() {
	makeRequest()
	loop()
}

export default init