import { useState } from "react";

import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';

import MoodIcon from '@mui/icons-material/Mood';
import StarIcon from '@mui/icons-material/Star';
import PianoIcon from '@mui/icons-material/Piano';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

import RatingItem from "../itemComponents/RatingItem";

import { calculateAverageRating, calculateAverageTempo, calculateAvgPopularityRating, getPopularityMessage } from "../../utils/ratingsUtils";

const RecentRatings = ({ recentPlaylist }) => {

    const [acousticnessRating, setAcousticnessRating] = useState(calculateAverageRating(recentPlaylist, "acousticness")) 
    const [danceabilityRating, setDanceabilityRating] = useState(calculateAverageRating(recentPlaylist, "danceability")) 
    const [energyRating, setEnergyRating] = useState(calculateAverageRating(recentPlaylist, "energy")) 
    const [happinessRating, setHappinessRating] = useState(calculateAverageRating(recentPlaylist, "valence")) 
    const [instrumentalnessRating, setInstrumentalnessRating] = useState(calculateAverageRating(recentPlaylist, "instrumentalness"))
    const [popularityRating, setPopularityRating] = useState(calculateAvgPopularityRating(recentPlaylist))
    const [speechinessRating, setSpeechinessRating] = useState(calculateAverageRating(recentPlaylist, "speechiness")) 
    const [ratingMessage, setRatingMessage] = useState(getPopularityMessage(popularityRating))

    const [averageBPM, setAverageBPM] = useState(calculateAverageTempo(recentPlaylist, "acousticness"))

    const ratingIconMap = [
        ["acousticness", acousticnessRating, setAcousticnessRating, "Acousticness Rating:", 
        <VolumeDownIcon style={{ opacity: 1.0, color: "grey" }} />, <VolumeDownIcon style={{ color: '#1ED760' }}/>],
        ["danceability", danceabilityRating, setDanceabilityRating, "Danceability Rating:", 
        <NightlifeIcon style={{ opacity: 1.0, color: "grey" }} />, <NightlifeIcon style={{ color: '#4E119A' }}/>],
        ["energy", energyRating, setEnergyRating, "Energy Rating:", 
        <FlashOnIcon style={{ opacity: 1.0, color: "grey" }} />, <FlashOnIcon style={{ color: 'orange' }} />],
        ["happiness", happinessRating, setHappinessRating, "Happiness Rating:", 
        <MoodIcon style={{ opacity: 1.0, color: "grey" }} />, <MoodIcon style={{ color: 'cyan' }} />],
        ["instrumentalness", instrumentalnessRating, setInstrumentalnessRating, "Instrumentalness Rating:", 
        <PianoIcon style={{ opacity: 1.0, color: "grey" }} />, <PianoIcon style={{ color: '#002b5c' }} />],
        ["popularity", popularityRating, setPopularityRating, "Popularity Rating:", 
        <StarIcon style={{ opacity: 1.0, color: "grey" }} />, <StarIcon style={{ color: 'gold' }} />],
        ["speechiness", speechinessRating, setSpeechinessRating, "Speechiness Rating:", 
        <RecordVoiceOverIcon style={{ opacity: 1.0, color: "grey" }} />, <RecordVoiceOverIcon style={{ color: 'tan' }} />]
    ]

    const HEADER_LABEL = "Rating your last 50 played songs. 🎼"
    const TEMPO_LABEL = "Tempo:"
    const RATING_DESC_ONE = "What are all these ratings?"
    const RATING_DESC_TWO = "For each music track, Spotify assigns a rating, or confidence measure, from 0.0 to 1.0 for each category."
    const RATING_DESC_THREE = "The ratings above are an average of your 50 most recently played songs and converted on a scale of 10."

    return (
        <Stack className="recent-container" justifyContent="center" style={{ width: "50%" }}>

            {/* RECENT RATINGS HEADER */}
            <h1 className="title-divider-right">
                {HEADER_LABEL}
            </h1>

            <Divider className="default-divider" />

            <Stack className="rating-container">

                {/* RECENT RATINGS ICONS AND RATES */}
                {
                    ratingIconMap.map((ratingObj, index) => 
                    <RatingItem rating={ratingObj[1]} description={ratingObj[3]} GreyIcon={ratingObj[4]} Icon={ratingObj[5]} index={index} key={index} />)
                }

                {/* AVERAGE BPM / TEMPO */}
                <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                    <h4>{TEMPO_LABEL}</h4>
                    <h4 className="red-text">
                        {averageBPM}
                    </h4>
                </Stack>

                {/* RECENT RATINGS MESSAGE */}
                <p className="text-align-right">
                    {ratingMessage}
                </p>

                {/* RECENT RATINGS DESCRIPTION */}  
                <Stack>
                    <small className="small-desc-grey">
                        {RATING_DESC_ONE}
                    </small>

                    <small className="small-desc-grey">
                        {RATING_DESC_TWO}
                    </small>

                    <small className="small-desc-grey">
                        {RATING_DESC_THREE}
                    </small>
                </Stack>

            </Stack>

        </Stack>
    )
}

export default RecentRatings;