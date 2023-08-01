import Stack from "@mui/material/Stack";

const ABOUT_TITLE = "about"
const ABOUT_DESC = `Vibeify began as a hobby software project so that Spotify users and enthusiasts can 
gain insights into their current and past Spotify usage. This web-application currently does not support other music platforms like Apple Music
and is only compatible with Spotify. At the moment, Vibeify allows you to view your most recently played songs and figure out your 
top 10 songs, genres, and artists.`

const AboutInfo = () => {

    return (
        <Stack spacing={1}>
            {/* ABOUT HEADER TITLE */}
            <h1 className="text-align-center">
                {ABOUT_TITLE}
            </h1>

            {/* ABOUT DESCRIPTION */}
            <p className="text-align-center">
                {ABOUT_DESC}
            </p>

        </Stack>
    )
}

export default AboutInfo;
