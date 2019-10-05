import session from "express-session"
import connectRedis from "connect-redis"
import redis from "redis"

const redisStore = connectRedis(session)
const redisClient = redis.createClient();

export default {
	mongoURI: "mongodb://Winston:DoubleClick@uptimecheckercluster-shard-00-00-7ssik.mongodb.net:27017,uptimecheckercluster-shard-00-01-7ssik.mongodb.net:27017,uptimecheckercluster-shard-00-02-7ssik.mongodb.net:27017/test?ssl=true&replicaSet=uptimeCheckerCluster-shard-0&authSource=admin&retryWrites=true&w=majority",
	sessionStore: {
		store: new redisStore({ host: "localhost", port: 6379, client: redisClient, }),
		secret: "secret",
		resave: true,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: false,
		},
	},
	PORT: 5000,

	twilioFromNumber: "+18706171694",
	accountSidTwilio: "AC0d32a3bb6ca79631e88881869730dabe",
	authTokenTwilio: "f367c7907217cb9f8a67c9e24ebb9e5d",
}