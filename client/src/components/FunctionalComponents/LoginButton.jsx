import { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import React from 'react';

const LOGIN_BUTTON_LABEL = "Login to Spotify"

const LoginButton = () => {
    const [isProcessing, setIsProcessing] = useState(false)

    const handleLogin = async () => {
        setIsProcessing(true)

		try {
            // const baseURL = window.location.origin
            // const response = await axios.get(`/auth/login`, { withCredentials: true })
			const response = await axios.get('http://localhost:5000/auth/login', { withCredentials: true })

            if (response.status === 200) {
                const { redirectURL } = response.data
                window.location = redirectURL
                setIsProcessing(false)
            } else {
                setIsProcessing(false)
            }

		} catch (error) {
            setIsProcessing(false)
		}
	}

    return (
        <div className="padding-2-rem" data-testid="login-button">
            <Button className="auth-btn" variant="contained" onClick={handleLogin} disabled={isProcessing} >
                {LOGIN_BUTTON_LABEL}
            </Button>
        </div>
    )
}

export default LoginButton;