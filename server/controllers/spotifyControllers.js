const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load all the environment variables

const spotifyServices = require('../services/spotifyServices');

const requestRecentlyPlayed = async (req, res) => {
    // get accessToken param
    const accessToken = req.session.access_token

    try {
        // make request to Spotify API
        const recentPlaylistWithFeatures = await spotifyServices.fetchRecentlyPlayed(accessToken)
        
        // return the data
        return res.status(200).send({ items: recentPlaylistWithFeatures })
    
    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was an error geting Spotify API data." })
    }
}

const requestUserTopArtists = async (req, res) => {
    // get accessToken and timeRange params
    const accessToken = req.session.access_token
    const { timeRange } = req.query
    
    try {
        // make a request to Spotify API
        const topArtists = await spotifyServices.fetchUserTopArtists(timeRange, accessToken)

        // return the data
        return res.status(200).send({ items: topArtists })

    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was error getting Spotify API data." })
    }
}

const requestUserTopTracks = async (req, res) => {
    // get accessToken and timeRange params
    const accessToken = req.session.access_token
    const { timeRange } = req.query
    
    try {
        // make a request to Spotify API
        const topTracksWithFeatures = await spotifyServices.fetchUserTopTracks(timeRange, accessToken)

        // return the data
        return res.status(200).send({ items: topTracksWithFeatures })

    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was error getting Spotify API data." })
    }
}

module.exports = {
    requestRecentlyPlayed,
    requestUserTopArtists,
    requestUserTopTracks
}