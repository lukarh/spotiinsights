import { useState } from "react";

import axios from "axios";

import Button from '@mui/material/Button';

import RecentPlaylist from "../../components/spotifyComponents/recentPlaylist"
import TopUserItems from "../../components/spotifyComponents/topUserItems";
import TopUserTracks from "../../components/spotifyComponents/topUserTracks";

const Spotify = () => {
    const [timeRange, setTimeRange] = useState("medium_term")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogout = async () => {

        try {
            // const baseURL = window.location.origin
            // const response = await axios.get(`/auth/logout`, { withCredentials: true })
			const response = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true })

            if (response.status === 200) {
                const { redirectURL } = response.data
                window.location.href = redirectURL
            } else {
                setErrorMessage("An unexpected error occurred. Try again.")
            }

		} catch (error) {
            setErrorMessage("An unexpected error occurred. Try again.")
		}
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <div style={{ display: "flex", flexDirection: "row" }}>

                <div style={{ padding: "1rem", width: "33%" }}>
                    <RecentPlaylist />
                </div>

                <div style={{ padding: "1rem", width: "67%" }}>
                    <TopUserItems timeRange={timeRange} setTimeRange={setTimeRange} />
                </div>

            </div>

            <div style={{ padding: "1rem", paddingTop: "0rem" }}>
                <TopUserTracks timeRange={timeRange} setTimeRange={setTimeRange}  />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "2rem", paddingBottom: "2rem" }}>

                    <h1>Privacy Policy.</h1>
                    <p>
                        Vibeify was developed as an open source app powered by Spotify's Web API. By choosing to use this app, you agree to the use of your Spotify
                        Account username and data for your top artists and tracks.
                    </p>
                    <p>
                        Vibeify does not store or collect your data anywhere, and is also not shared with any third parties. All information is used solely for displaying 
                        your insights on the webpage for your viewing.
                    </p>
                    <p>
                        You can revoke Vibeify's permissions to your Spotify Account & Data by 
                        visiting <a href="https://www.spotify.com/us/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427" style={{ color: "green" }}>your Spotify connections page
                        </a> and clicking "REMOVE ACCESS" for Vibeify.
                    </p>

                </div>

                <div style={{ paddingBottom: "3rem" }}>
                    <Button variant="contained" color="success" onClick={handleLogout} style={{ fontFamily: 'inter', fontWeight: 'bold' }}>
                        Logout
                    </Button>
                </div>
            </div>

        </div>
    )

}

export default Spotify;