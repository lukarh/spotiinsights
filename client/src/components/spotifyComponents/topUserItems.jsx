import { useState, useEffect } from "react";

import Rating from '@mui/material/Rating';
import Divider  from '@mui/material/Divider';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import StarIcon from '@mui/icons-material/Star';

import { ResponsiveRadialBar } from '@nivo/radial-bar'

import axios from "axios";

const TopUserItems = ({ timeRange, setTimeRange }) => {
    const [artistRating, setArtistRating] = useState(0.0)
    const [artistRatingMessage, setArtistRatingMessage] = useState('')
    const [topArtistsData, setTopArtistsData] = useState(undefined)
    const [radialBarData, setRadialBarData] = useState(undefined)

    // const [timeRange, setTimeRange] = useState("medium_term")

    const changeTimeRange = async (event, newTimeRange) => {
        setTimeRange(newTimeRange)

        try {
            const response = await axios.get(`/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            // const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=${newTimeRange}`, { withCredentials: true })
            const { artistsData } = response.data

            calculateAvgArtistsPopularityRating(artistsData.items)
            setTopArtistsData(artistsData.items)
            calculateTopGenres(artistsData.items)

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
        const averageRating = parseFloat(totalRating / arr.length / 10).toFixed(1)
        setArtistRating(averageRating)

        // create popularity rating message
        if (averageRating >= 8) {
            setArtistRatingMessage("You've been listening to popular/mainstream artists.")
        } else if (averageRating >= 6) {
            setArtistRatingMessage("You've been listening to popular and various artists.")
        } else if (averageRating >= 4) {
            setArtistRatingMessage("You've been listening to a mix of niche artists.")
        } else if (averageRating >= 2) {
            setArtistRatingMessage("You've been listening to niche and lesser-known artists.")
        } else {
            setArtistRatingMessage("You've been listening to unique and eclectic artists.")
        }
        return
    }

    const calculateTopGenres = (arr) => {
        const genreCounts = {}

        // get genre counts
        arr.forEach(artistItem => {
            const artistGenres = artistItem.genres

            artistGenres.forEach(genre => {
                if (!genreCounts[genre]) {
                    genreCounts[genre] = 1
                } else {
                    genreCounts[genre] += 1
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
        genreCountsArray.sort((a, b) => a[1] - b[1]);

        const top10Genres = genreCountsArray.slice(-10);
        
        // make the data usable for NivoCharts
        const chartData = top10Genres.map(([ genre, count ]) => ({
            "id": capitalizeEveryWord(genre),
            "data": [ 
                {
                    "x": "counts",
                    "y": count
                } 
            ],
        }))

        setRadialBarData(chartData)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/top-artists?timeRange=medium_term`, { withCredentials: true })

                const { artistsData } = response.data

                calculateAvgArtistsPopularityRating(artistsData.items)
                setTopArtistsData(artistsData.items)
                calculateTopGenres(artistsData.items)

            } catch (error) {
                window.location.href ='/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [])

    const ArtistItem = (item, index) => {
        return (
            <div className="row" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "0.25rem" }} key={item.name}>

                <div style={{ width: "2%", paddingLeft: "1.5rem", paddingRight: "2.5rem" }}>
                    {index+1}
                </div>

                <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer" >
                    <img src={item.images[2].url} style={{ borderRadius: "50%", marginRight: "10px", width: "48px", height: "48px" }} />
                </a>

                <div style={{ width: "33%" }}>
                    <h5 style={{ fontSize: "14px" }}>{item.name}</h5>
                </div>

                <div style={{ width: "38%"}}>
                    <Rating name="read-only" value={parseFloat(item.popularity / 20).toFixed(1)} precision={0.1} readOnly 
                     emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />}/>
                </div>

                <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer" >
                    <img src={"https://i.imgur.com/54e1ekg.png"} 
                     style={{ marginRight: "10px", width: "24px", height: "24px" }} />
                </a>

            </div>
        )
    }

    const TopArtists = () => {

        return (
            <div style={{ borderRadius: "15px", backgroundColor: "#121212", width: "45%" }}>

                <h1 style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>Your Top 50 Artists</h1>
                <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem" }} />

                <div style={{ maxHeight: "87vh", overflowY: "auto" }}>
                    {
                        topArtistsData.map((item, index) => ArtistItem(item, index))
                    }
                </div>

                <div style={{ padding: "1rem" }}>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                        <h3 style={{ marginRight: "5px" }}>Artist Popularity Rating:</h3>
                        <Rating name="read-only" value={artistRating} precision={0.1} readOnly max={10} emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />}/>
                    </div>

                    <p>{artistRatingMessage}</p>

                    <small style={{ fontSize: "12px", color: "grey" }}>
                        What is Popularity Rating? It is a metric calculated by Spotify's Alogirthm with the possible range of values
                        being from 0 to 100, with 100 being the most popular. Your popularity rating is an average of all your most played artists
                        and is converted to a scale of 10. 
                    </small>

                </div>

            </div>
        )
    }

    const TopGenresChart = ({ data }) => {

        return (
            <div style={{ borderRadius: "15px", backgroundColor: "#121212", width: "50%", marginLeft: "2rem", width: "55%" }}>

                <h1 style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>Your Top 10 Genres</h1>
                <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem" }} />
                <div style={{ height: "55%", position: "relative" }}>

                    <ResponsiveRadialBar 
                        data={data}
                        padding={.3}
                        colors={['#16DB63']}
                        borderWidth={1.25}
                        borderColor="#DDDDDD"
                        theme={{
                            axis: {
                                ticks: {
                                    text: {
                                        fill: 'white',
                                        fontSize: '14px'
                                    },
                                },
                            },
                        }}
                        tooltip={d => {
                            return (
                                <div style={{ backgroundColor: "black", color: "white", padding: "6px" }}>
                                    {d.bar.id.slice(0, -7)} - {d.bar.value}
                                </div>
                            )
                        }}
                    />
                    </div>

                    <Divider style={{ backgroundColor: "white", margin: "1rem", marginBottom: "0rem" }} />

                    <div style={{ padding: "1rem" }}>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                            <h2 style={{ marginRight: "5px" }}>How are your top genres determined?</h2>
                        </div>

                        <p>
                            Your Top Genres are determined by analyzing your top 50 artists. Spotify associates each artist with a variety of 
                            genres depending on the music they make. Therefore, your top genres is the number of times a genre appears in your 
                            list of top 50 artists.
                        </p>

                    </div>

                    <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem" }} />

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "22.5%" }}>

                        <h3>Get your Spotify insights for the following time period:</h3>

                        <div style={{ padding: "10px" }}>

                            <ToggleButtonGroup value={timeRange} exclusive onChange={changeTimeRange} 
                            style={{ fontFamily: 'DM Sans', backgroundColor: 'green', color: 'black', fontWeight: 'bold' }}>
                                <ToggleButton value="short_term" style={{ fontFamily: 'DM Sans', fontWeight: 'bold' }}>
                                    Last Month
                                </ToggleButton>
                                <ToggleButton value="medium_term" style={{ fontFamily: 'DM Sans', fontWeight: 'bold' }}>
                                    Last 6 Months
                                </ToggleButton>
                                <ToggleButton value="long_term" style={{ fontFamily: 'DM Sans', fontWeight: 'bold' }}>
                                    All-Time
                                </ToggleButton>
                            </ToggleButtonGroup>

                        </div>

                        <p>This will change insights for your favorite artists, top genres, and most played tracks.</p>
                        
                    </div>

                </div>
        )
    }

    return (
        <>
            {
                (topArtistsData)
                ?
                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <TopArtists />
                    <TopGenresChart data={radialBarData}/>
                </div>     
                :
                <></>
            }
        </>
    )
}

export default TopUserItems;