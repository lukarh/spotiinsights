import { useState, useEffect, useContext } from "react";

import axios from "axios";

import Stack from '@mui/material/Stack';

import TopTracks from "../../../components/topUserSongsComponents/TopTracks";
import TracksSpectrum from "../../../components/topUserSongsComponents/TracksSpectrum";

import { TimeRangeContext } from "../../../contexts/TimeRangeContext";

const TopUserSongs = () => {
    const [topTracksData, setTopTracksData] = useState(undefined)
    const [spectrumData, setSpectrumData] = useState(undefined)

    const timeContext = useContext(TimeRangeContext)
    const timeRange = timeContext.timeRange

    useEffect(() => {
        const getSpectrumData = (tracks) => {
            const happyTracks = [...tracks].sort((a, b) => b.features.valence - a.features.valence).slice(0,5)
            const sadTracks = [...tracks].sort((a,b) => a.features.valence - b.features.valence).slice(0,5)
            const spectrumTracks = happyTracks.concat(sadTracks.reverse())

            setSpectrumData(spectrumTracks)
        }

        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                const { items } = response.data

                getSpectrumData(items)
                setTopTracksData(items)
            } catch (error) {
                window.location.href = '/home'
            }
        }

        fetchUserSpotifyData()  
        
    }, [timeRange])

    return (
        <Stack className="padding-2-rem">
        {
            (topTracksData)
            ?
            <>
                <TopTracks topTracksData={topTracksData} /> 
                <TracksSpectrum spectrumData={spectrumData} />
            </>  
            :
            <></>
        }
        </Stack>
    )
}

export default TopUserSongs;