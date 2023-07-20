import { useState, useEffect } from "react";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import axios from "axios";

import TopGenres from "../genreComponents/TopGenres";
import TopArtists from "../artistComponents/TopArtists";
import UnpopularArtists from "../artistComponents/UnpopularArtists";

const TopUserItems = ({ timeRange, setTimeRange }) => {
    const [artistRating, setArtistRating] = useState(0.0)
    const [artistRatingMessage, setArtistRatingMessage] = useState('')
    const [topArtistsData, setTopArtistsData] = useState(undefined)
    const [unpopularArtists, setUnpopularArtists] = useState(undefined)
    const [topGenres, setTopGenres] = useState(undefined)

    const changeTimeRange = async (event, newTimeRange) => {
        setTimeRange(newTimeRange)

        try {
            const response = await axios.get(`/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            // const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            const { artistsData } = response.data

            calculateAvgArtistsPopularityRating(artistsData.items)
            getTopGenres(artistsData.items)
            getUnpopularArtists(artistsData.items)
            setTopArtistsData(artistsData.items)

        } catch (error) {
            window.location.href = '/home'
        }
    }

    const capitalizeEveryWord = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const calculateAvgArtistsPopularityRating = (arr) => {
        // edge case if array is undefined or has no elements in it
        if ((!arr) || arr.length === 0) {
            setArtistRating(0)
            return
        }
        
        // calculate average popularity rating
        let totalRating = 0
        for (const artistItem of arr) {
            totalRating += artistItem.popularity
        }
        const averageRating = parseFloat(totalRating / arr.length / 10 / 2).toFixed(1)
        setArtistRating(averageRating)

        // create popularity rating message
        if (averageRating >= 4) {
            setArtistRatingMessage("You've been listening to popular/mainstream artists.")
        } else if (averageRating >= 3) {
            setArtistRatingMessage("You've been listening to popular and various artists.")
        } else if (averageRating >= 2) {
            setArtistRatingMessage("You've been listening to a mix of niche artists.")
        } else if (averageRating >= 1) {
            setArtistRatingMessage("You've been listening to niche and lesser-known artists.")
        } else {
            setArtistRatingMessage("You've been listening to unique and eclectic artists.")
        }
        return
    }

    const getTopGenres = (arr) => {
        const genreCounts = {}

        // get genre counts
        arr.forEach(artistItem => {
            const artistGenres = artistItem.genres

            artistGenres.forEach(genre => {
                if (!genreCounts[capitalizeEveryWord(genre)]) {
                    genreCounts[capitalizeEveryWord(genre)] = 1
                } else {
                    genreCounts[capitalizeEveryWord(genre)] += 1
                }
            })
        })

        // delete all genres with a value of one
        Object.keys(genreCounts).forEach((genre) => {
            if (genreCounts[genre] === 1) {
                delete genreCounts[genre]
            }
        })

        // convert object of genre objects to array of genre arrays in ascending order
        const genreCountsArray = Object.entries(genreCounts);
        genreCountsArray.sort((a, b) => b[1] - a[1]);
        const top10Genres = genreCountsArray.slice(0, 10);
        setTopGenres(top10Genres)
    }

    const getUnpopularArtists = (arr) => {

        const sortedArray = [...arr].sort((a,b) => a.popularity - b.popularity)

        const topFiveUnpopularArtists = sortedArray.slice(0,5)

        setUnpopularArtists(topFiveUnpopularArtists)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })

                const { artistsData } = response.data

                calculateAvgArtistsPopularityRating(artistsData.items)
                getTopGenres(artistsData.items)
                getUnpopularArtists(artistsData.items)
                setTopArtistsData(artistsData.items)

            } catch (error) {
                window.location.href ='/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [])

    return (
        <>
            {
                (topArtistsData)
                ?
                <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingLeft: "2rem", paddingRight: "2rem" }}>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                        <h1 style={{ padding: "1.5rem", paddingBottom: "0.25rem" }}>Vibe Check your past Spotify usage by clicking one of the following time periods:</h1>

                        <div style={{ padding: "1rem", fontFamily: "DM Sans" }}>

                            <FormControl style={{ fontFamily: "DM Sans" }}>

                                <RadioGroup
                                    value={timeRange}
                                    onChange={changeTimeRange}  
                                    style={{ display: "flex", flexDirection: "row", justifyContent: "center", fontFamily: "DM Sans" }}
                                >
                                    <FormControlLabel value="short_term" control={<Radio />} label="Current" style={{ fontFamily: "DM Sans" }} />
                                    <FormControlLabel value="medium_term" control={<Radio />} label="Last 6 Months" style={{ fontFamily: "DM Sans" }} />
                                    <FormControlLabel value="long_term" control={<Radio />} label="All-Time" style={{ fontFamily: "DM Sans" }} />
                                </RadioGroup>

                            </FormControl>

                        </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <TopArtists topArtistsData={topArtistsData} artistRating={artistRating} artistRatingMessage={artistRatingMessage} />
                        <UnpopularArtists unpopularArtists={unpopularArtists} />
                    </div>

                    <TopGenres topGenres={topGenres}/>
                </div>     
                :
                <></>
            }
        </>
    )
}

export default TopUserItems;