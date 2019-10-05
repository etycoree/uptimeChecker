import express from "express"
import passport from "passport"
import session from "express-session"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

import addUserRoutes from "./routes/userRoutes"
import addCheckRoutes from "./routes/checkRoutes"
import config from "./config"
import setPassportStrategy from "./services/passport"
import addCheckFetcher from "./services/checkFetcher"


mongoose.connect(config.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(()  => console.log("Connected to MongoDB"))
	.catch(err => console.log(`Can't connect to MongoDB \nError: ${err}`))

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(session(config.sessionStore))

setPassportStrategy()

app.use(passport.initialize())
app.use(passport.session())

addUserRoutes(app)
addCheckRoutes(app)
addCheckFetcher()

app.listen(config.PORT, () => console.log(`Server listen on port ${config.PORT}`))