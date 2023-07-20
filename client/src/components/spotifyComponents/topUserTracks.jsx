import { useState, useEffect } from "react";

import Divider from '@mui/material/Divider';

import axios from "axios";

const TopUserTracks = ({ timeRange, setTimeRange }) => {
    const [topTracksData, setTopTracksData] = useState(undefined)
    const [spectrumData, setSpectrumData] = useState(undefined)

    useEffect(() => {
        const getSpectrumData = (arr, tracks) => {
            const happyTracks = [...arr].sort((a, b) => b.valence - a.valence).slice(0,5)
            const sadTracks = [...arr].sort((a,b) => a.valence - b.valence).slice(0,5)

            const spectrumTrackFeatures = happyTracks.concat(sadTracks.reverse())
            const spectrumIds = spectrumTrackFeatures.map((item) => item.id)

            const spectrumTracks = tracks.filter((item) => spectrumIds.includes(item.id))
            spectrumTracks.sort((a,b) => spectrumIds.indexOf(a.id) - spectrumIds.indexOf(b.id))

            setSpectrumData(spectrumTracks)
        }

        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                const { tracksData, trackFeaturesData } = response.data

                getSpectrumData(trackFeaturesData.audio_features, tracksData.items)
                setTopTracksData(tracksData.items)
            } catch (error) {
                window.location.href = '/home'
            }
        }

        fetchUserSpotifyData()  
        
    }, [timeRange])

    const MusicItem = (item, index) => {
        const removeParanthesesRegex = /\([^()]*\)/g

        return (
            <div className="row" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem", 
                width: "10%", height: "225px", marginBottom: "auto" }} 
             key={index+1}>

                <a href={item.external_urls.spotify}>
                    <img src={item.album.images[1].url} alt="Album" style={{ marginBottom: "10px", height: "100px", width: "100px" }} />
                </a>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <p>#{index+1}</p>
                    <h5 style={{ fontSize: "14px" }}>{item.name.replace(removeParanthesesRegex, '')}</h5>
                    <p style={{ fontSize: "12px" }}>{item.artists.slice(0,2).map(artist => artist.name).join(', ')}</p>
                </div>

            </div>
        )
    }

    const TopTracks = () => {
        return (
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem" }}>

                <h1 style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>Your Top 10 Songs. 🎹</h1>
                <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

                <div style={{ display: "flex", flexDirection: "row" }}>
                    {
                        topTracksData.slice(0,10).map((item, index) => MusicItem(item, index))
                    }
                </div>  

                <small style={{ fontSize: "12px", color: "white", paddingLeft: "1.25rem" }}>
                    Your Top 10 songs is your most listened to songs for whatever time period you chose.
                </small>

            </div>
        )
    }

    const TracksSpectrum = () => {
        return (
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem" }}>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>Happy Songs 😃</h1>
                    <h1>Your Top Songs Spectrum</h1>
                    <h1 style={{ paddingRight: "2rem", paddingBottom: "0.5rem" }}>Sad Songs 😔</h1>
                </div>

                <Divider className="gradient-divider" style={{ marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

                <div style={{ display: "flex", flexDirection: "row" }}>
                    {
                        spectrumData.slice(0,10).map((item, index) => MusicItem(item, index))
                    }
                </div>  

                <div style={{ marginLeft: "1.25rem" }}>
                    <small style={{ fontSize: "12px", color: "white", textAlign: "left" }}>
                        Your Top Songs Spectrum is your 5 most happiest and 5 most saddest songs according to Spotify's valence metric for whatever time period you chose.
                        You might disagree with some songs being labeled happy or sad I found.
                    </small>
                </div>

            </div>
        )
    }

    return (
        <div style={{ padding: "2rem", width: "100%" }}>
            {
                (topTracksData)
                ?
                <>
                    <TopTracks /> 
                    <TracksSpectrum />
                </>  
                :
                <></>
            }
        </div>
    )
}

export default TopUserTracks;