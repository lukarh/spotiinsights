import Stack from "@mui/material/Stack";

import LoginButton from "../../../components/functionalComponents/LoginButton";

const HomeLogin = () => {
    const HOME_TITLE_MESSAGE = 'Vibeify'
    const HOME_DESC_TOP = "Interested in analyzing your music taste?"
    const HOME_DESC_MID = "You've come to the right place."
    const HOME_DESC_BOT = "Get a vibe check on your current and past Spotify usage."
    const HOME_DESC_LOGIN = "This app is currently in developer mode and only authorized Spotify users can gain insights."

    return (
        <Stack className="flex-center">

            {/* LOGIN CONTAINER HEADER */}
            <h1 className="text-title">{HOME_TITLE_MESSAGE}</h1>

            {/* LOGIN CONTAINER DESCRIPTION */}
            <p className="text-align-center">{HOME_DESC_TOP}</p>
            <p className="text-align-center">{HOME_DESC_MID}</p>
            <p className="text-align-center">{HOME_DESC_BOT}</p>

            {/* LOGIN BUTTON */}
            <LoginButton />

            {/* LOGIN CONTIANER DESCRIPTION CONT.. */}
            <p className="text-align-center">{HOME_DESC_LOGIN}</p>

        </Stack>
    )
}

export default HomeLogin;