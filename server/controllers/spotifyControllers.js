const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load all the environment variables

const spotifyServices = require('../services/spotifyServices');

const getUserRecentlyPlayedTracks = async (req, res) => {
    // get accessToken param
    const accessToken = req.session.accessToken

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

const getUserTopArtists = async (req, res) => {
    // get accessToken and timeRange params
    const accessToken = req.session.accessToken
    const { timeRange } = req.query
    
    try {
        // make a request to Spotify API
        const topArtists = await spotifyServices.fetchUserTopArtists(timeRange, accessToken)

        // return the data
        return res.status(200).send({ items: topArtists })

    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was an error getting Spotify API data." })
    }
}

const getUserTopTracks = async (req, res) => {
    // get accessToken and timeRange params
    const accessToken = req.session.accessToken
    const { timeRange } = req.query
    
    try {
        // make a request to Spotify API
        const topTracksWithFeatures = await spotifyServices.fetchUserTopTracks(timeRange, accessToken)

        // return the data
        return res.status(200).send({ items: topTracksWithFeatures })

    } catch (error) {
        // otherwise an error occurred
        return res.status(500).send({ message: "There was an error getting Spotify API data." })
    }
}

const getUserProfile = async (req, res) => {
    // get accessToken
    const accessToken = req.session.accessToken

    try {
        // make a request to Spotify API
        const userProfile = await spotifyServices.fetchUserProfile(accessToken)

        // return the data
        return res.status(200).send({ profile: userProfile })
    } catch (error) {
        return res.status(500).send({ message: "There was an error getting Spotify API data."})
    }
}

const getSongRecommendations = async (req, res) => {
    // get accessToken and params
    const accessToken = req.session.accessToken
    const { 
        limit, seed_artists, seed_genres, seed_tracks, 
        min_acousticness, max_acousticness,
        min_danceability, max_danceability,
        min_energy, max_energy,
        min_popularity, max_popularity, 
        min_valence, max_valence
    } = req.query

    try {
        // make a request to Spotify API
        const songRecommendations = await spotifyServices.fetchSongRecommendations(
            accessToken, limit,
            seed_artists, seed_genres, seed_tracks, 
            min_acousticness, max_acousticness,
            min_danceability, max_danceability,
            min_energy, max_energy,
            min_popularity, max_popularity, 
            min_valence, max_valence
        )

        // return the data
        return res.status(200).send({ items: songRecommendations })
    } catch (error) {
        return res.status(500).send({ message: "There was an error getting Spotify API data." })
    }
}

const getSpotifySearchResults = async (req, res) => {
    // get accessToken and params
    const accessToken = req.session.accessToken

    var { searchQuery, searchType } = req.query
    searchQuery = searchQuery.replace(/\s+/g, '+')


    try {
        // make a request to Spotify API
        const searchResults = await spotifyServices.fetchSpotifySearchResults(accessToken, searchQuery, searchType)

        // return the data
        return res.status(200).send({ items: searchResults })
    } catch (error) {
        return res.status(500).send({ message: "There was an error getting Spotify API data." })
    }
}

module.exports = {
    getUserRecentlyPlayedTracks,
    getUserTopArtists,
    getUserTopTracks,
    getUserProfile,
    getSongRecommendations,
    getSpotifySearchResults
}