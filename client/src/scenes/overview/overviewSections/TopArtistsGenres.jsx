import { useState, useEffect, useContext } from "react";

import axios from "axios";

import Stack from '@mui/material/Stack';

import TopGenres from "../../../components/topArtistsGenresComponents/TopGenres";
import PopularArtists from "../../../components/topArtistsGenresComponents/PopularArtists";
import UnpopularArtists from "../../../components/topArtistsGenresComponents/UnpopularArtists";

import TimeRadioGroup from "../../../components/functionalComponents/TimeRadioGroup";

import { getTopGenres } from "../../../utils/genreUtils";
import { sortArtistsByPopularity } from "../../../utils/ratingsUtils";

import { TimeRangeContext } from "../../../contexts/TimeRangeContext";

const TopArtistGenres = () => {
    const timeContext = useContext(TimeRangeContext)

    const [topArtistsData, setTopArtistsData] = useState(undefined)
    const [sortedArtistsData, setSortedArtistsData] = useState(undefined)
    const [topGenres, setTopGenres] = useState(undefined)

    useEffect(() => {
        const fetchUserSpotifyData = async () => {
            try {
                // const response = await axios.get(`/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })
                const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })
                const { items } = response.data

                setTopArtistsData(items)
                setTopGenres(getTopGenres(items))
                setSortedArtistsData(sortArtistsByPopularity(items))

            } catch (error) {
                window.location.href ='/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [])

    const handleTimeChange = async (event, newTimeRange) => {
        timeContext.changeTimeRange(newTimeRange)

        try {
            // const response = await axios.get(`/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            const { items } = response.data

            setTopArtistsData(items)
            setTopGenres(getTopGenres(items))
            setSortedArtistsData(sortArtistsByPopularity(items))

        } catch (error) {
            window.location.href = '/home'
        }
    }

    return (
        (topArtistsData)
        ?
        <Stack className="padding-2-rem">

            {/* TIME RADIO GROUP USER CONTROLS */}
            <TimeRadioGroup handleTimeChange={handleTimeChange} />

            {/* USER TOP ARTISTS COMPONENTS */}
            <Stack direction="row" justifyContent="space-evenly" spacing={1}>
                <PopularArtists topArtistsData={topArtistsData} />
                <UnpopularArtists sortedArtistsData={sortedArtistsData} />
            </Stack>

            {/* USER TOP GENRES COMPONENT */}
            <TopGenres topGenres={topGenres}/>
            
        </Stack>
        :
        <></>
    )
}

export default TopArtistGenres;