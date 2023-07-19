import { useState, useEffect } from "react";

import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

import MoodIcon from '@mui/icons-material/Mood';
import StarIcon from '@mui/icons-material/Star';
import PianoIcon from '@mui/icons-material/Piano';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

import axios from "axios";

const RecentPlaylist = () => {
    const [rating, setRating] = useState(0)

    const [acousticnessRating, setAcousticnessRating] = useState(0) 
    const [danceabilityRating, setDanceabilityRating] = useState(0) 
    const [energyRating, setEnergyRating] = useState(0) 
    const [happinessRating, setHappinessRating] = useState(0) 
    const [instrumentalnessRating, setInstrumentalnessRating] = useState(0)
    const [speechinessRating, setSpeechinessRating] = useState(0) 
    const [averageBPM, setAverageBPM] = useState(0)

    const [ratingMessage, setRatingMessage] = useState('')
    const [recentPlaylist, setRecentPlaylist] = useState(undefined)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const calcualteAverageTempo = (arr) => {
            if ((!arr) || arr.length === 0) {
                setRating(0)
                return
            }
            
            const totalBPM = arr.reduce((sum, track) => sum + track.tempo, 0)
            const averageBPM = parseFloat(totalBPM / arr.length).toFixed(1)
            setAverageBPM(averageBPM)
        }

        const calculateAvgPopularityRating = (arr) => {

            if ((!arr) || arr.length === 0) {
                setRating(0)
                return
            }
            
            let totalRating = 0
            
            for (const musicItem of arr) {
                totalRating += musicItem.track.popularity
            }

            const averageRating = parseFloat(totalRating / arr.length / 10).toFixed(1)
            setRating(averageRating)

            if (averageRating >= 8) {
                setRatingMessage("You've been listening to popular/mainstream music.")
            } else if (averageRating >= 6) {
                setRatingMessage("You've been listening to popular and various music.")
            } else if (averageRating >= 4) {
                setRatingMessage("You've been listening to a mix of niche music.")
            } else if (averageRating >= 2) {
                setRatingMessage("You've been listening to niche and lesser-known music.")
            } else {
                setRatingMessage("You've been listening to unique and eclectic music.")
            }
            return
        }

        const calculateAverageRating = (arr, propertyName, propertyState) => {

            if ((!arr) || arr.length === 0) {
                setRating(0)
                return
            }
            
            const totalRating = arr.reduce((sum, track) => sum + track[propertyName], 0)
            const averageRating = parseFloat(totalRating / arr.length * 10).toFixed(1)

            propertyState[1](averageRating)
        }

        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/recently-played`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/recently-played`, { withCredentials: true })
                const { recentPlaylistData, trackFeaturesData } = response.data

                const propertyStateMap = {
                    acousticness: [acousticnessRating, setAcousticnessRating],
                    danceability: [danceabilityRating, setDanceabilityRating],
                    energy: [energyRating, setEnergyRating],
                    happiness: [happinessRating, setHappinessRating],
                    instrumentalness: [instrumentalnessRating, setInstrumentalnessRating],
                    speechiness: [speechinessRating, setSpeechinessRating]
                  };   

                calculateAvgPopularityRating(recentPlaylistData.items)

                calculateAverageRating(trackFeaturesData.audio_features, "acousticness", propertyStateMap.acousticness)
                calculateAverageRating(trackFeaturesData.audio_features, "danceability", propertyStateMap.danceability)
                calculateAverageRating(trackFeaturesData.audio_features, "energy", propertyStateMap.energy)
                calculateAverageRating(trackFeaturesData.audio_features, "valence", propertyStateMap.happiness)
                calculateAverageRating(trackFeaturesData.audio_features, "instrumentalness", propertyStateMap.instrumentalness)
                calculateAverageRating(trackFeaturesData.audio_features, "speechiness", propertyStateMap.speechiness)

                calcualteAverageTempo(trackFeaturesData.audio_features)

                setRecentPlaylist(recentPlaylistData.items)
            } catch (error) {
                window.location.href = '/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [])

    // Function to format the date portion
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString)
        return dateObj.toLocaleDateString()
    }
    
    // Function to format the time portion without seconds
    const formatTimeWithoutSeconds = (dateString) => {
        const dateObj = new Date(dateString)
        const options = { hour: 'numeric', minute: 'numeric' }
        return dateObj.toLocaleTimeString([], options)
    }
    
    const MusicItem = (item, index) => {
        return (
            <div className="row" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "0.25rem" }} key={item.played_at}>
                <div style={{ width: "2%", paddingLeft: "1.5rem", paddingRight: "2.5rem" }}>
                    {index+1}
                </div>
                <div>
                    <img src={item.track.album.images[2].url} style={{ borderRadius: "5px", marginRight: "10px", width: "48px", height: "48px" }} />
                </div>
                <div style={{ width: "450px" }}>
                    <h5 style={{ fontSize: "14px" }}>{item.track.name}</h5>
                    <p style={{ fontSize: "12px" }}>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div>
                    <p style={{ fontSize: "12px" }}>{formatDate(item.played_at)}</p>
                    <p style={{ fontSize: "12px" }}>{formatTimeWithoutSeconds(item.played_at)}</p>
                </div>
            </div>
        )
    }

    const RecentlyPlayed = () => {

        return (
            <div style={{ borderRadius: "15px", backgroundColor: "#121212" }}>
                <h1 style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>What You've Been Recently Listening</h1>
                <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem" }} />
                <div style={{ maxHeight: "61vh", overflowY: "auto" }}>
                    {
                        recentPlaylist.map((item, index) => MusicItem(item, index))
                    }
                </div>
                <div style={{ padding: "1rem" }}>

                    <Divider style={{ backgroundColor: "white", marginBottom: "1rem" }} />
                    <h2 style={{ marginBottom: "10px" }}>Your Last 50 Played Songs in Review</h2>
                    <Divider style={{ backgroundColor: "white", marginBottom: "1rem" }} />

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Acousticness Rating:</h4>
                        <Rating name="read-only" value={acousticnessRating} precision={0.1} readOnly max={10} 
                        emptyIcon={<VolumeDownIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<VolumeDownIcon style={{ color: '#1ED760' }}/>} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{acousticnessRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Danceability Rating:</h4>
                        <Rating name="read-only" value={danceabilityRating} precision={0.1} readOnly max={10} 
                         emptyIcon={<NightlifeIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<NightlifeIcon style={{ color: '#4E119A' }}/>} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{danceabilityRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Energy Rating:</h4>
                        <Rating name="read-only" value={energyRating} precision={0.1} readOnly max={10} 
                         emptyIcon={<FlashOnIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<FlashOnIcon style={{ color: 'orange' }} />}/>
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{energyRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Happiness Rating:</h4>
                        <Rating name="read-only" value={happinessRating} precision={0.1} readOnly max={10} 
                         emptyIcon={<MoodIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<MoodIcon style={{ color: 'cyan' }} />} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{happinessRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Instrumentalness Rating:</h4>
                        <Rating name="read-only" value={instrumentalnessRating} precision={0.1} readOnly max={10} 
                         emptyIcon={<PianoIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<PianoIcon style={{ color: '#002b5c' }} />} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{instrumentalnessRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Popularity Rating:</h4>
                        <Rating name="read-only" value={rating} precision={0.1} readOnly max={10} 
                        emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<StarIcon style={{ color: 'gold' }}/>} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{rating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4 style={{ marginRight: "5px" }}>Speechiness Rating:</h4>
                        <Rating name="read-only" value={speechinessRating} precision={0.1} readOnly max={10} 
                        emptyIcon={<RecordVoiceOverIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<RecordVoiceOverIcon style={{ color: 'tan' }} />} />
                        <h5 style={{ marginLeft: "5px", marginRight: "5px" }}>{speechinessRating}/10</h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h4>Tempo:</h4>
                        <h4 style={{ marginLeft: "5px", marginRight: "5px", color: "#ed174c" }}>{averageBPM} BPM</h4>
                    </div>

                    <p>{ratingMessage}</p>

                    <small style={{ fontSize: "12px", color: "grey" }}>
                        What are all these ratings? For each music track, Spotify assigns a rating, or confidence measure, from 0.0 to 1.0
                        for each category. The ratings shown above is an average of your 50 most recently played songs and is converted on a scale to 10 
                        so that's it easier for you to understand.
                    </small>

                </div>
            </div>
        )
    }

    return (
        <>
            {
                (recentPlaylist)
                ?
                <>
                <RecentlyPlayed />
                </>     
                :
                <></>
            }
        </>
    )
}

export default RecentPlaylist;