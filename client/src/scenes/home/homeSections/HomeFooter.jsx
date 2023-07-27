import Stack from "@mui/material/Stack";

const HomeFooter = () => {
    const FOOTER_MESSAGE_ONE = "Powered by "
    const FOOTER_MESSAGE_TWO = "Spotify's Web API."
    const FOOTER_MESSAGE_THREE = "This web application is not endorsed or promoted by Spotify."
    const FOOTER_MESSAGE_FOUR = "© 2023 Lukar. "
    const FOOTER_MESSAGE_FIVE = "An open source"
    const FOOTER_MESSAGE_SIX = " React.js & Node.js Application built for fun."
    const GITHUB_LINK = "https://github.com/lukarh/vibeify"
    const SPOTIFY_LINK = "https://developer.spotify.com/documentation/web-api"

    return (
        <Stack className="auto-top-margin-padding">  
        
            {/* FOOTER DESCRIPTION LAYOUT */}
            <p className="text-align-center">
                {FOOTER_MESSAGE_ONE} 
                <a href={SPOTIFY_LINK} rel="noreferrer" style={{ color: "black" }}>
                    {FOOTER_MESSAGE_TWO} 
                </a>
            </p>

            <p className="text-align-center">
                {FOOTER_MESSAGE_THREE}
            </p>

            <p className="text-align-center">
                {FOOTER_MESSAGE_FOUR}
                <a href={GITHUB_LINK} rel="noreferrer" style={{ color: "black" }}>
                    {FOOTER_MESSAGE_FIVE}
                </a> 
                {FOOTER_MESSAGE_SIX}
            </p> 

        </Stack> 
    );
};

export default HomeFooter;