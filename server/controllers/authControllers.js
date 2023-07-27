const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load all the environment variables

const spotifyServices = require('../services/spotifyServices')

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const loginSpotify = async (req, res) => {
    // get client id from environment variables
    const spotify_client_id = process.env.SPOTIFY_CLIENT_ID

    // define scope of api call access
    var scope = "streaming \
    user-read-email \
    user-read-private  \
    user-top-read \
    user-read-recently-played" 

    // generate random state
    var state = generateCodeVerifier(16)

    // set up parameters for user to login with Spotify to access the website
    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:3000/redirect",
        // redirect_uri: "https://vibeify-1cdb0dbbe555.herokuapp.com/redirect",
        state: state
    })

    // return redirectURL
    return res.status(200).send({ redirectURL: 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString() })
}

const logoutSpotify = async (req, res) => {
    // destroy the user's session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({ error: 'Server error' })
        } else {
            res.status(200).json({ message: 'Logout successful', redirectURL: '/home' })
        }
    })
}

const requestAccessToken = async (req, res) => {
    // get code from query params
    const code = req.query.code

    try {
        // make a request to Spotify API
        const { access_token, refresh_token } = await spotifyServices.fetchAccessToken(code)

        // set access token and refresh token of the session
        req.session.access_token = access_token
        req.session.refresh_token = refresh_token

        // let client know access token request was successful
        return res.status(200).send({ message: "Successfully logged in via OAuth." })

    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was an error getting the Access Token" })
    }
}

const getAccessToken = async (req, res) => {
    const code = req.query.code

    try {
        const { access_token, refresh_token } = await spotifyServices.fetchAccessToken(code)

        req.session.access_token = access_token
        req.session.refresh_token = refresh_token

        return res.status(200).send({ message: "Successfully logged in via OAuth." })

    } catch (error) {
        return res.status(500).send({ message: "There was an error getting the Access Token" })
    }
}

module.exports = {
    loginSpotify,
    logoutSpotify,
    getAccessToken,
}