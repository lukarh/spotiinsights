const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/authControllers')

// Route for logging into Spotify
router.get('/login', AuthControllers.loginSpotify)

// Route for logging out of Spotify
router.get('/logout', AuthControllers.logoutSpotify)

// Route for getting AccessToken
router.get('/callback', AuthControllers.getAccessToken)

module.exports = router;