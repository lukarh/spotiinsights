const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }); // load .env file from one directory above

const session = require('express-session')

const MongoStore = require('connect-mongo')

const configureSession = (app) => {

    const ttl = 2 * 24 * 60 * 60 * 1000

    app.use(session({
        name: 'Spotiinsights-User',
        secret: process.env.SERVER_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_SESSIONS_URI,
            ttl: 1 * 60 * 60 // = 1 hour
        }),
        cookie: {
            secure: true,
            maxAge: ttl
        }
    }))

}

module.exports = configureSession;