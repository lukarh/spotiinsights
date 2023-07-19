const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load all the environment variables

const axios = require('axios')

// const request = require('request');

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const loginSpotify = async (req, res) => {
    const spotify_client_id = process.env.SPOTIFY_CLIENT_ID

    var scope = "streaming \
    user-read-email \
    user-read-private  \
    user-top-read \
    user-read-recently-played" 

    var state = generateCodeVerifier(16)

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:3000/redirect",
        // redirect_uri: "https://spotiinsights-7ca95654505a.herokuapp.com/redirect",
        state: state
    })
    return res.status(200).send({ redirectURL: 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString() })
}

const logoutSpotify = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({ error: 'Server error' })
        } else {
            res.status(200).json({ message: 'Logout successful', redirectURL: '/home' })
        }
    })
}

const getAccessToken = async (req, res) => {
    const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
    const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

    const code = req.query.code

    try {

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
              code: code,
              redirect_uri: "http://localhost:3000/redirect", 
            //   redirect_uri: "https://spotiinsights-7ca95654505a.herokuapp.com/redirect",
              grant_type: 'authorization_code'
            }),
            headers: {
              'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

        const response = await axios.post(authOptions.url, authOptions.data, {
            headers: authOptions.headers
        })

        if (response.status === 200) {
            const { access_token, refresh_token } = response.data

            req.session.access_token = access_token
            req.session.refresh_token = refresh_token
            return res.status(200).send({ message: "Successfully logged in via OAuth." })
        }

        return res.status(500).send({ message: "There was an error getting the Access Token" })
    } catch (error) {
        return res.status(500).send({ message: "There was an error getting the Access Token" })
    }
}

const getRefreshToken = async (req, res) => {
    const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
    const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

    var refresh_token = req.query.refresh_token

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
            form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            var request_token = body.request_token
            return res.status(200).send({ 'access_token': access_token, refresh_token: request_token })
        } else {
            return res.status(500).send({ message: "There was an error getting the Refresh Token."})
        }
    })
}

module.exports = {
    loginSpotify,
    logoutSpotify,
    getAccessToken,
    getRefreshToken,
}