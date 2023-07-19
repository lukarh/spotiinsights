const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/authControllers')

// Route for logging into Spotify
router.get('/login', AuthControllers.loginSpotify)

// Route for logging out of Spotify
router.get('/logout', AuthControllers.logoutSpotify)

// Route for getting AccessToken
router.get('/callback', AuthControllers.getAccessToken)

// Route for getting RefreshToken
router.get('/get-refresh-token', AuthControllers.getRefreshToken)

module.exports = router;