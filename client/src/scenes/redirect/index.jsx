import { useEffect } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const CALLBACK_LABEL = "Performing a vibe check on your Spotify..."

const Redirect = () => {

    useEffect(() => {
        const getAccessToken = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const code = urlParams.get('code')
    
            // check if code exists in the URL
            if (code) {
                try {
                    // const baseURL = window.location.origin
                    const response = await axios.get(`/auth/callback?code=${code}`, { withCredentials: true })
                    // const response = await axios.get(`http://localhost:5000/auth/callback?code=${code}`, { withCredentials: true })
                    if (response.status === 200) {
                        window.location.href = '/about'
                    }
                } catch (error) {
                    window.location.href = '/home'
                }
            }
            // otherwise redirect user to the login page
            else {
                window.location.href = '/home'
            }
        }
		getAccessToken()
	}, [])

    const ProgressNotification = () => {

        return (
            <>
                <h1 className="text-align-center padding-2-rem">
                    {CALLBACK_LABEL}
                </h1>
                <CircularProgress className="spinner-dimensions" color="success" />
            </>
        )
    }

    return (
        <Stack className="background padding-2-rem flex-center">
            {/* CALLBACK HEADER AND PROGRESS SPINNER */}
            <ProgressNotification />
        </Stack>
    )
}

export default Redirect;