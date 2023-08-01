import Stack from "@mui/material/Stack";

const POLICY_TITLE = "Privacy Policy."
const POLICY_DESC_ONE = `Vibeify is an open source app powered by Spotify's Web API. 
By authorizing your Spotify account login to this website, you agree to the use of your Spotify Account username and data for your top artists and tracks.
Vibeify does not store or collect your data anywhere, nor is shared with any third parties. All information is used solely for displaying your insights 
on the webpage for your personal viewing. You can revoke Vibeify's permissions to your Spotify Account & Data by following `
const POLICY_DESC_HYPERLINK = "Spotify's instructions outlined here."
const SPOTIFY_HYPERLINK = "https://support.spotify.com/us/article/spotify-on-other-apps/"

const PrivacyPolicy = () => {

    return (
        <Stack spacing={1}>

            {/* PRIVACY POLICY HEADER TITLE */}
            <h1 className="text-align-center">
                {POLICY_TITLE}
            </h1>

            {/* PRIVACY POLICY DESCRIPTION */}
            <p className="text-align-center">
                {POLICY_DESC_ONE}
                <a className="hyperlink" href={SPOTIFY_HYPERLINK}>
                    {POLICY_DESC_HYPERLINK}
                </a> 
            </p>
        
        </Stack>
    )
}

export default PrivacyPolicy;