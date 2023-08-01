import { useState } from "react";
import Stack from "@mui/material/Stack";
import MoodIcon from '@mui/icons-material/Mood';
import StarIcon from '@mui/icons-material/Star';
import PianoIcon from '@mui/icons-material/Piano';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import RatingItem from "../ItemComponents/RatingItem";
import SectionTitle from "../DescriptionComponents/SectionTitle";
import { calculateAverageRating, calculateAverageTempo, calculateAvgPopularityRating, getPopularityMessage } from "../../utils/ratingsUtils";

const HEADER_LABEL = "Rating your last 50 played songs. 🎼"
const TEMPO_LABEL = "Tempo:"
const RATING_DESC_ONE = "What are all these ratings?"
const RATING_DESC_TWO = "For each music track, Spotify assigns a rating, or confidence measure, from 0.0 to 1.0 for each category."
const RATING_DESC_THREE = "The ratings above are an average of your 50 most recently played songs and converted on a scale of 10."

const RecentRatings = ({ recentPlaylist }) => {

    const [acousticnessRating, setAcousticnessRating] = useState(calculateAverageRating(recentPlaylist, "acousticness")) 
    const [danceabilityRating, setDanceabilityRating] = useState(calculateAverageRating(recentPlaylist, "danceability")) 
    const [energyRating, setEnergyRating] = useState(calculateAverageRating(recentPlaylist, "energy")) 
    const [happinessRating, setHappinessRating] = useState(calculateAverageRating(recentPlaylist, "valence")) 
    const [instrumentalnessRating, setInstrumentalnessRating] = useState(calculateAverageRating(recentPlaylist, "instrumentalness"))
    const [popularityRating, setPopularityRating] = useState(calculateAvgPopularityRating(recentPlaylist))
    const [speechinessRating, setSpeechinessRating] = useState(calculateAverageRating(recentPlaylist, "speechiness")) 

    const ratingMessage = getPopularityMessage(popularityRating)
    const averageBPM = calculateAverageTempo(recentPlaylist, "acousticness")

    // const [ratingMessage, setRatingMessage] = useState(getPopularityMessage(popularityRating))
    // const [averageBPM, setAverageBPM] = useState(calculateAverageTempo(recentPlaylist, "acousticness"))

    const ratingIconMap = [
        ["acousticness", acousticnessRating, setAcousticnessRating, "Acousticness Rating:", 
        <VolumeDownIcon className="grey-icon" />, <VolumeDownIcon className="volume-icon" />],
        ["danceability", danceabilityRating, setDanceabilityRating, "Danceability Rating:", 
        <NightlifeIcon className="grey-icon" />, <NightlifeIcon className="nightlife-icon" />],
        ["energy", energyRating, setEnergyRating, "Energy Rating:", 
        <FlashOnIcon className="grey-icon" />, <FlashOnIcon className="flashon-icon" />],
        ["happiness", happinessRating, setHappinessRating, "Happiness Rating:", 
        <MoodIcon className="grey-icon" />, <MoodIcon className="mood-icon" />],
        ["instrumentalness", instrumentalnessRating, setInstrumentalnessRating, "Instrumentalness Rating:", 
        <PianoIcon className="grey-icon" />, <PianoIcon className="piano-icon" />],
        ["popularity", popularityRating, setPopularityRating, "Popularity Rating:", 
        <StarIcon className="grey-icon" />, <StarIcon className="star-icon" />],
        ["speechiness", speechinessRating, setSpeechinessRating, "Speechiness Rating:", 
        <RecordVoiceOverIcon className="grey-icon" />, <RecordVoiceOverIcon className="record-icon" />]
    ]

    return (
        <Stack justifyContent="center">

            {/* RECENT RATINGS HEADER */}
            <SectionTitle title={HEADER_LABEL} />

            <Stack className="rating-container">

                {/* RECENT RATINGS ICONS AND RATES */}
                {
                    ratingIconMap.map((ratingObj, index) => 
                    <RatingItem rating={ratingObj[1]} description={ratingObj[3]} GreyIcon={ratingObj[4]} Icon={ratingObj[5]} index={index} />)
                }

                {/* AVERAGE BPM / TEMPO */}
                <Stack direction="row" spacing={0.5}>
                    <h4>{TEMPO_LABEL}</h4>
                    <h4 className="red-text">
                        {averageBPM}
                    </h4>
                </Stack>

                {/* RECENT RATINGS MESSAGE */}
                <p>
                    {ratingMessage}
                </p>

                {/* RECENT RATINGS DESCRIPTION */}  
                <Stack>
                    <small className="small-desc-lightgrey">
                        {RATING_DESC_ONE}
                    </small>

                    <small className="small-desc-lightgrey">
                        {RATING_DESC_TWO}
                    </small>

                    <small className="small-desc-lightgrey">
                        {RATING_DESC_THREE}
                    </small>
                </Stack>

            </Stack>

        </Stack>
    )
}

export default RecentRatings;