import twilio from 'twilio'
import config from '../config'

const client = new twilio(config.accountSidTwilio, config.authTokenTwilio)

function sendSMS(to, body) {
	client.messages.create({
		body,
		to,
		from: config.twilioFromNumber,
	})
		.then(console.log("SENDED"))
}

export default sendSMS