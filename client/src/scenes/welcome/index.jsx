import axios from "axios";
import Stack from "@mui/material/Stack";
import TwinkleStarsAnimation from "../../components/BackgroundComponents/TwinkleStarsAnimation";
import { useQuery } from "@tanstack/react-query";

const WELCOME_LABEL = "Welcome to Vibeify, "
const WELCOME_LABEL_END ="! 👋"
const WELCOME_DESC = "Get a vibe check on your current and past Spotify usage." 
const WELCOME_DESC_2 = "Gain insights to your most recently played music."
const WELCOME_DESC_3 = "Figure out your top 10 artists, genres, or songs."

const Welcome = () => {
    const { data, isLoading } = useQuery(["userProfile"], () => {
        return axios.get(`/api/spotify/user-profile`, { withCredentials: true }).then((res) => res.data.profile)
        // return axios.get(`http://localhost:5000/api/spotify/user-profile`, { withCredentials: true }).then((res) => res.data.profile)
    })

    if (isLoading) {
        return (
            <Stack className="background">
                {/* BACKGROUND ANIMATION */}
                <TwinkleStarsAnimation />
            </Stack>
        )
    }

    const userFirstName = data.display_name.split(' ')[0]

    return (
        <Stack className="background flex-center">
            
            {/* BACKGROUND ANIMATION */}
            <TwinkleStarsAnimation />

            <Stack className="flex-center text-align-center title-welcome split-container">
                <h1>{WELCOME_LABEL}{userFirstName}{WELCOME_LABEL_END}</h1>
                <h5>{WELCOME_DESC}</h5>
                <h5>{WELCOME_DESC_2}</h5>
                <h5>{WELCOME_DESC_3}</h5>
            </Stack>

        </Stack>
    )
}

export default Welcome;