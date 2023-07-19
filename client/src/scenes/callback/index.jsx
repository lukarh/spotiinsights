import { useEffect } from "react";

import axios from "axios";

import CircularProgress from '@mui/material/CircularProgress';

const Callback = () => {
    useEffect(() => {
        const getAccessToken = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const code = urlParams.get('code')
    
            if (code) {
                try {
                    // const baseURL = window.location.origin
                    // const response = await axios.get(`/auth/callback?code=${code}`, { withCredentials: true })
                    const response = await axios.get(`http://localhost:5000/auth/callback?code=${code}`, { withCredentials: true })
                    
                    console.log('the response', response.status)
                    if (response.status === 200) {
                        window.location.href = '/spotify-overview'
                    }
    
                } catch (error) {
                    window.location.href = '/home'
                }
            }
            else {
                window.location.href = '/home'
            }
        }

		getAccessToken()
	}, [])

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "4rem", paddingBottom: "4rem", height: "100%" }}>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "30%" }}>

                <h1 style={{ marginBottom: "5rem" }}>Loading your Spotify Stats...</h1>
                <CircularProgress color="success" style={{ width: "100px", height: "80px" }} />

            </div>

        </div>
    )
}

export default Callback;