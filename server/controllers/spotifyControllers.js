const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load all the environment variables

const axios = require('axios');

const getTracksFeatures = async (trackIds, accessToken) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        return response
    } catch (error) {
        console.log('Track Features Error:', error.response.data)
        return res.status(500).send({ message: "There was an error getting Tracks Features from Spotify API for Recently Played." })
    }
}

const getRecentlyPlayed = async (req, res) => {
    const accessToken = req.session.access_token
    console.log('Recently Played Token', accessToken)

    try {
        console.log('calling recently played:')
        const response = await axios.get(
            `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
            {
                headers: {
                'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        
        // get the tracks and loop through the tracks and made ID query
        const tracks = response.data.items
        let trackIds = ''
        for (const trackItem of tracks) {
            trackIds += (trackItem.track.id + ',')
        }
        trackIds = trackIds.slice(0,-1)

        // get tracks features
        const featuresResponse = await getTracksFeatures(trackIds, accessToken)

        return res.status(200).send({ recentPlaylistData: response.data, trackFeaturesData: featuresResponse.data })
    
    } catch (error) {
        console.log('Recently Played Error:', error.response.data)
        return res.status(500).send({ message: "There was an error geting Spotify API data." })
    }
}

const getUserTopArtists = async (req, res) => {
    const accessToken = req.session.access_token
    const { timeRange } = req.query

    console.log('Top Artists Token', accessToken)
    
    try {
        const artistsResponse = await axios.get(
            `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )

        return res.status(200).send({ artistsData: artistsResponse.data })
    } catch (error) {
        console.log('Top Artists Error:', error.response.data)
        return res.status(500).send({ message: "There was error getting Spotify API data." })
    }
}

const getUserTopTracks = async (req, res) => {
    const accessToken = req.session.access_token
    const { timeRange } = req.query

    console.log('Top Tracks Token', accessToken, timeRange)
    
    try {
        const tracksResponse = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )

        // get the tracks and loop through the tracks and made ID query
        const tracks = tracksResponse.data.items
        let trackIds = ''
        for (const trackItem of tracks) {
            trackIds += (trackItem.id + ',')
        }
        trackIds = trackIds.slice(0,-1)

        // get tracks features
        const featuresResponse = await getTracksFeatures(trackIds, accessToken)

        return res.status(200).send({ tracksData: tracksResponse.data, trackFeaturesData: featuresResponse.data })
    } catch (error) {
        console.log('Top Tracks Error:', error.response.data)
        return res.status(500).send({ message: "There was error getting Spotify API data." })
    }
}

module.exports = {
    getRecentlyPlayed,
    getUserTopArtists,
    getUserTopTracks
}