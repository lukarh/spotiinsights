const express = require('express');
const path = require('path');
require('dotenv').config() // load all the environment variables

var cors = require('cors') // allows any IP address to access express server

const app = express()

const configureSession = require('./middleware/sessionMiddleware')
configureSession(app)

app.use(cors({ 
    credentials: true, 
    // origin: "http://localhost:3000" 
    origin: "https://spotiinsights-7ca95654505a.herokuapp.com/", 
    methods: "GET, POST, PUT, DELETE"
}))

app.set("trust proxy", 1)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://spotiinsights-7ca95654505a.herokuapp.com/");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();  
 });    // --------------- SECOND CHANGE -------------------

const authRoutes = require('./routes/authRoutes')
const spotifyRoutes = require('./routes/spotifyRoutes')

app.use('/auth', authRoutes)
app.use('/api/spotify', spotifyRoutes)

console.log(process.env.NODE_ENV)
console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    const indexPath = path.join(__dirname, '../client/build', 'index.html');
    console.log(indexPath)
    app.get('*', function(req, res) {
        res.sendFile(indexPath, function(err) {
          if (err) {
            res.status(500).send(err)
          }
        })
    })
} 


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on... ${port}`))

    // app.use(express.static('../client/build'));
    // app.get("*", (req, res) => {
    //     const temp = path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    //     console.log(temp)
    //     res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'), {}, (error) => {
    //         console.log(error)
    //     });
    // })