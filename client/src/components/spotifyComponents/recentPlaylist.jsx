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

import { scaleLinear } from 'd3';

import BPMChart from "../../charts/bpmChart";
import HappinessChart from "../../charts/happinessChart";

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

    const [chartDataBPM, setChartDataBPM] = useState(undefined)
    const [lineChartData, setLineChartData] = useState(undefined)

    const [ratingMessage, setRatingMessage] = useState('')
    const [recentPlaylist, setRecentPlaylist] = useState(undefined)

    const createChartData = (audioFeatures, recentPlaylist) => {
        // check if array exists
        if ((!audioFeatures) || audioFeatures.length === 0) {
            return
        }

        // create BPM data for Bar Chart

        // find min/max BPM and create color scale
        // const minBPM = audioFeatures.reduce((min, item) => (item.tempo < min ? item.tempo : min), audioFeatures[0].tempo)
        // const maxBPM = audioFeatures.reduce((max, item) => (item.tempo > max ? item.tempo : max), audioFeatures[0].tempo)

        const minBPM = 70
        const maxBPM = 180
        const bpmColorScale = scaleLinear()
            .domain([minBPM, (minBPM + maxBPM) / 2, maxBPM])
            .range(['cyan','gold','red'])

        // combine input arrays so that we can loop through both arrays of objects
        const combinedArray = audioFeatures.map((item, index) => ({
            ...item, 
            ...recentPlaylist[index]
        }))

        // prepare data for nivocharts to ingest
        const bpmData = combinedArray.map((musicItem, index) => (
            {
                track: musicItem.track.name,
                BPM: parseFloat(musicItem.tempo).toFixed(1),
                color: bpmColorScale(musicItem.tempo),
                date: formatDate(musicItem.played_at),
                time: formatTimeWithoutSeconds(musicItem.played_at),
                dateTime: formatDate(musicItem.played_at) + " " + formatTimeWithoutSeconds(musicItem.played_at)
            }
        ))

        // prepare line data for nivocharts to ingest
        const happinessData = [
            {
                "id": "happiness",
                "data": combinedArray.map((musicItem, index) => (
                        {
                            "x": index+1,
                            "y": parseFloat(musicItem.valence - 0.5).toFixed(3),
                            "song": musicItem.track.name,
                            "dateTime": formatDate(musicItem.played_at) + " " + formatTimeWithoutSeconds(musicItem.played_at)
                        }
                    ))
            }
        ]

        setChartDataBPM(bpmData)
        setLineChartData(happinessData)
    }

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

                createChartData(trackFeaturesData.audio_features, recentPlaylistData.items)

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
            <div className="row" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} key={item.played_at}>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "5%", paddingLeft: "1.75rem", paddingRight: "1.75rem" }}>
                    {index+1}
                </div>

                <div style={{ display: "flex", flexDirection: "row", width: "80%" }}>

                    <a href={item.track.external_urls['spotify']} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center" }}>
                        <img src={item.track.album.images[2].url} alt="Album" style={{ borderRadius: "5px", width: "50px", height: "50px" }} />
                    </a>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                        <h5 style={{ fontSize: "14px" }}>{item.track.name}</h5>
                        <p style={{ fontSize: "12px" }}>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>

                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontSize: "12px" }}>{formatDate(item.played_at)}</p>
                    <p style={{ fontSize: "12px" }}>{formatTimeWithoutSeconds(item.played_at)}</p>
                </div>
            </div>
        )
    }

    const RecentlyPlayed = () => {

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>

                {/* 1st ROW  */}
                <div style={{ display: "flex", flexDirection: "row", paddingLeft: "2rem", paddingRight: "2rem" }}>

                    {/* 1ST COLUMN CONTAINER OF ROW */}
                    <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "1rem", paddingRight: "1rem" }}>

                        <h1 style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>Most Recently Played. 🎶</h1>
                        <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px", width: "92.5%" }} />


                        <div style={{ maxHeight: "45vh", overflowY: "auto", width: "93%" }}>
                            {
                                recentPlaylist.map((item, index) => MusicItem(item, index))
                            }
                        </div>  

                    </div>

                    {/* 2ND COLUMN CONTAINER OF ROW */}
                    <div style={{ display: "flex", flexDirection: "column", width: "45%", justifyContent: "center", marginLeft: "auto", paddingRight: "1rem" }}>

                        <h1 style={{ paddingRight: "2rem", paddingBottom: "0.5rem", marginLeft: "auto" }}>Rating your last 50 played songs. 🎼</h1>
                        <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Acousticness Rating:</h4>
                            <Rating name="read-only" value={acousticnessRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<VolumeDownIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<VolumeDownIcon style={{ color: '#1ED760' }}/>} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{acousticnessRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Danceability Rating:</h4>
                            <Rating name="read-only" value={danceabilityRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<NightlifeIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<NightlifeIcon style={{ color: '#4E119A' }}/>} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{danceabilityRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Energy Rating:</h4>
                            <Rating name="read-only" value={energyRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<FlashOnIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<FlashOnIcon style={{ color: 'orange' }} />}/>
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{energyRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Happiness Rating:</h4>
                            <Rating name="read-only" value={happinessRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<MoodIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<MoodIcon style={{ color: 'cyan' }} />} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{happinessRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Instrumentalness Rating:</h4>
                            <Rating name="read-only" value={instrumentalnessRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<PianoIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<PianoIcon style={{ color: '#002b5c' }} />} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{instrumentalnessRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Popularity Rating:</h4>
                            <Rating name="read-only" value={rating} precision={0.1} readOnly max={10} 
                            emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<StarIcon style={{ color: 'gold' }}/>} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{rating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", marginLeft: "auto", paddingRight: "1rem" }}>
                            <h4 style={{ marginRight: "5px" }}>Speechiness Rating:</h4>
                            <Rating name="read-only" value={speechinessRating} precision={0.1} readOnly max={10} 
                            emptyIcon={<RecordVoiceOverIcon style={{ opacity: 1.0, color: "grey" }} />} icon={<RecordVoiceOverIcon style={{ color: 'tan' }} />} />
                            <h5 style={{ display: "flex", justifyContent: "center", width: "50px" }}>{speechinessRating}/10</h5>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
                            <h4>Tempo:</h4>
                            <h4 style={{ marginLeft: "5px", marginRight: "20px", color: "#ed174c" }}>{averageBPM} BPM</h4>
                        </div>

                        <p style={{ marginLeft: "auto", marginRight: "20px" }}>{ratingMessage}</p>

                        <small style={{ fontSize: "12px", color: "grey", marginLeft: "auto", marginRight: "20px", marginTop: "10px" }}>
                            What are all these ratings?
                        </small>

                        <small style={{ fontSize: "12px", color: "grey", marginLeft: "auto", marginRight: "20px", textAlign: "right" }}>
                            For each music track, Spotify assigns a rating, or confidence measure, from 0.0 to 1.0
                            for each category. 
                        </small>

                        <small style={{ fontSize: "12px", color: "grey", marginLeft: "auto", marginRight: "20px", textAlign: "right" }}>
                            The ratings above are an average of your 50 most recently played songs and converted on a scale of 10.
                        </small>

                    </div>
                </div>

                {/* 2ND ROW */}

                <div style={{ display: "flex", flexDirection: "row", padding: "2rem" }}>

                    {/* CHART CONTAINER */}
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}>

                        <h1 style={{ paddingLeft: "2rem", paddingBottom: "0.5rem" }}>Your Recent Songs' BPM Monitor. 📻</h1>
                        <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

                        <BPMChart data={chartDataBPM} /> 

                        <small style={{ fontSize: "12px", color: "grey", marginRight: "20px" }}>
                            A BPM Monitor of your 50 most recently played songs. BPM stands for Beats per Minute and indicates the tempo and pace of a song or piece of music.
                        </small>

                        <h1 style={{ marginLeft: "auto", paddingRight: "2rem", paddingBottom: "0.5rem", marginTop: "50px" }}>Your Song Mood Swings. 🥴</h1>
                        <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

                        <HappinessChart data={lineChartData} recentPlaylist={recentPlaylist} /> 

                        <small style={{ fontSize: "12px", color: "grey", marginLeft: "auto", marginRight: "20px" }}>
                            Per <a href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features">Spotify's API</a>, they assign each song a 'valence' rating from 0.0 to 1.0.
                            Low valence is associated with negative emotions, while high valence associating with positive emotions.
                        </small>

                    </div>

                </div>

            </div>
        )
    }

    return (
        <>
            {
                (recentPlaylist)
                ?
                <RecentlyPlayed />
                :
                <></>
            }
        </>
    )
}

export default RecentPlaylist;