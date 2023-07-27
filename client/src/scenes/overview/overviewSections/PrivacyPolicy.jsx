import Stack from "@mui/material/Stack";

const PrivacyPolicy = () => {
    const POLICY_TITLE = "Privacy Policy."
    const POLICY_DESC_ONE = "Vibeify is an open source app powered by Spotify's Web API. By choosing to use this app, you agree to the use of your Spotify Account username and data for your top artists and tracks."
    const POLICY_DESC_TWO = "Vibeify does not store or collect your data anywhere, and is also not shared with any third parties. All information is used solely for displaying your insights on the webpage for your personal viewing."
    const POLICY_DESC_THREE = "You can revoke Vibeify's permissions to your Spotify Account & Data by visiting " 
    const POLICY_DESC_FOUR = ' and clicking "REMOVE ACCESS" for Vibeify.'
    const POLICY_DESC_HYPERLINK = "your Spotify connections page"
    const SPOTIFY_HYPERLINK = "https://www.spotify.com/us/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427"

    return (
        <Stack>

            {/* PRIVACY POLICY HEADER TITLE */}
            <h1 className="text-align-center">
                {POLICY_TITLE}
            </h1>

            {/* PRIVACY POLICY DESCRIPTION */}
            <p className="text-align-center">
                {POLICY_DESC_ONE}
            </p>

            {/* PRIVACY POLICY DESCRIPTION */}
            <p className="text-align-center">
                {POLICY_DESC_TWO}
            </p>

            {/* PRIVACY POLICY DESCRIPTION */}
            <p className="text-align-center">
                {POLICY_DESC_THREE}
                <a href={SPOTIFY_HYPERLINK}>
                    {POLICY_DESC_HYPERLINK}
                </a> 
                {POLICY_DESC_FOUR}
            </p>
        
        </Stack>
    )
}

export default PrivacyPolicy;