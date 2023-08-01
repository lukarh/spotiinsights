import { useState } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";

import genres from "../../data/genres";
import TwinkleStarsAnimation from "../../components/BackgroundComponents/TwinkleStarsAnimation";
// import SearchBar from "../../components/FunctionalComponents/SearchBar";
import SlidersGroup from "../../components/FunctionalComponents/SlidersGroup";
import RecommendButton from "../../components/FunctionalComponents/RecommendButton";
import GenreTransferList from "../../components/FunctionalComponents/GenreTransferList";

// import SelectedTracks from "../../components/RecommendationComponents/SelectedTracks";
// import SelectedArtists from "../../components/RecommendationComponents/SelectedArtists";
import SongRecommendations from "../../components/RecommendationComponents/SongRecommendations";

const Recommendations = () => {
    const [genres, setGenres] = useState(['spanish','pop','latin','latino','dance'])
    // const [artistIDs, setArtistIDs] = useState("")
    // const [tracksIDs, setTracksIDs] = useState("")
    // const [searchType, setSearchType] = useState("track")
    // const [searchQuery, setSearchQuery] = useState("post malone")
    // const [searchResults, setSearchResults] = useState(undefined)
    // const [errorSearchMessage, setErrorSearchMessage] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [errorRecsMessage, setErrorRecsMessage] = useState("")
    const [songRecommendations, setSongRecommendations] = useState([])
    

    const [numberOfSongs, setNumberOfSongs] = useState(25)
    const [acousticValue, setAcousticValue] = useState([0.5, 0.82])
    const [danceabilityValue, setDanceabilityValue] = useState([0.72, 1.0])
    const [energyValue, setEnergyValue] = useState([0.6, 0.85])
    const [popularityValue, setPopularityValue] = useState([42, 71])
    const [valenceValue, setValenceValue] = useState([0.22, 0.64])

    const sliderValues = [
        {
            ariaLabel: 'No. of Songs',
            min: 1, 
            max: 50,
            step: 1,
            value: numberOfSongs,
            handleChange: (event, newValue) => {
                setNumberOfSongs(newValue)
            },
            color: "primary"
        },
        {
            ariaLabel: 'Acoustic Range',
            min: 0, 
            max: 1,
            step: 0.01,
            value: acousticValue,
            handleChange: (event, newValue) => {
                setAcousticValue(newValue)
            },
            color: "#424FF7"
        },
        {
            ariaLabel: 'Danceability Range',
            min: 0, 
            max: 1,
            step: 0.01,
            value: danceabilityValue,
            handleChange: (event, newValue) => {
                setDanceabilityValue(newValue)
            },
            color: "#9C27B0"
        },
        {
            ariaLabel: 'Energy Range',
            min: 0, 
            max: 1,
            step: 0.01,
            value: energyValue,
            handleChange: (event, newValue) => {
                setEnergyValue(newValue)
            },
            color: "#FC9384"
        },
        {
            ariaLabel: 'Popularity Range',
            min: 0, 
            max: 100,
            step: 1,
            value: popularityValue,
            handleChange: (event, newValue) => {
                setPopularityValue(newValue)
            },
            color: "#D6587F"
        },
        {
            ariaLabel: 'Valence Range',
            min: 0, 
            max: 1,
            step: 0.01,
            value: valenceValue,
            handleChange: (event, newValue) => {
                setValenceValue(newValue)
            },
            color: "#FFD700"
        }
    ]

    // const getSearchResults = async (event) => {
    //     event.preventDefault()
    //     console.log('The query', searchQuery)

    //     try {
    //         const searchResults = await axios.get(
    //             `http://localhost:5000/api/spotify/search-results?searchQuery=${searchQuery}&searchType=${searchType}`, { withCredentials: true }
    //         )
    //         setSearchResults(searchResults.data.items)
    //     } catch (error) {
    //         setErrorSearchMessage('There was an error connecting to Spotify API')
    //     }
    // }

    const getSongRecommendations = async (event) => {
        setIsLoading(true)
        setErrorRecsMessage('')

        try {
            const searchResults = await axios.get(
                `/api/spotify/song-recommendations?limit=${numberOfSongs}&seed_genres=${genres}&min_acousticness=${acousticValue[0]}&max_acousticness=${acousticValue[1]}&min_danceability=${danceabilityValue[0]}&max_danceability=${danceabilityValue[1]}&min_energy=${energyValue[0]}&max_energy=${energyValue[1]}&min_popularity=${popularityValue[0]}&max_popularity=${popularityValue[1]}&min_valence=${valenceValue[0]}&max_valence=${valenceValue[1]}`, { withCredentials: true }
                // `http://localhost:5000/api/spotify/song-recommendations?limit=${numberOfSongs}&seed_genres=${genres}&min_acousticness=${acousticValue[0]}&max_acousticness=${acousticValue[1]}&min_danceability=${danceabilityValue[0]}&max_danceability=${danceabilityValue[1]}&min_energy=${energyValue[0]}&max_energy=${energyValue[1]}&min_popularity=${popularityValue[0]}&max_popularity=${popularityValue[1]}&min_valence=${valenceValue[0]}&max_valence=${valenceValue[1]}`, { withCredentials: true }
            )
            setSongRecommendations(searchResults.data.items)
        } catch (error) {
            setErrorRecsMessage('There was an error connecting to Spotify API')
        }

        setIsLoading(false)
    }


    return (
        <div className="flex-background">
            <Container>

                {/* BACKGROUND ANIMATION */}
                <TwinkleStarsAnimation />

                {/* SONG RECOMMENDATION FILTERS */}
                <Grid container>
                    <Grid item xs={6}>
                        <SlidersGroup sliderValues={sliderValues}/>
                    </Grid>
                    <Grid item xs={6}>
                        <GenreTransferList 
                            right={genres}
                            setRight={setGenres}
                        />
                    </Grid>
                </Grid>

                {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSubmit={getSearchResults} errorSearchMessage={errorSearchMessage}/> */}
                
                {/* SONG RECOMMENDATION RESULTS AND ACTIONS */}
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={3}>
                        <RecommendButton handleSubmit={getSongRecommendations} errorMessage={errorRecsMessage} />
                    </Grid>
                    <Grid item xs={9}>
                        <SongRecommendations songRecommendations={songRecommendations} isLoading={isLoading} />
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default Recommendations;