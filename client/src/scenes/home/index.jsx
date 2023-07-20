import { useState } from "react";

import axios from 'axios';

import Button from '@mui/material/Button';

const Home = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async () => {
        setIsProcessing(true)

		try {
            // const baseURL = window.location.origin
            const response = await axios.get(`/auth/login`, { withCredentials: true })
			// const response = await axios.get('http://localhost:5000/auth/login', { withCredentials: true })

            if (response.status === 200) {
                const { redirectURL } = response.data
                window.location = redirectURL
                setIsProcessing(false)
            } else {
                setErrorMessage("An unexpected error occurred. Try again.")
                setIsProcessing(false)
            }

		} catch (error) {
            setErrorMessage("An unexpected error occurred. Try again.")
            setIsProcessing(false)
		}
	}


    return (
        <>

            <div className="background">

                <div className="stars"></div>   
                <div className="twinkling"></div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "35%", height: "100%" }}>
                        <h1 style={{ fontSize: "50px" }}>Vibeify.</h1>
                        <p>Interested in analyzing your music taste?</p>
                        <p>You've come to the right place.</p>
                        <p>Get a vibe check on your current and past Spotify usage.</p>

                        <div style={{ padding: "2rem" }}>
                            <Button variant="contained" onClick={handleLogin} disabled={isProcessing} 
                             style={{ backgroundColor: "black", fontFamily: "DM Sans", fontWeight: "bold", borderRadius: "20px", height: "50px", width: "200px", 
                                      boxShadow: "0px 3px 3px 3px rgba(90, 94, 211, .4)"}}>
                                Login to Spotify
                            </Button>
                        </div>

                        <p>This app is currently in developer mode and only authorized users can gain insights.</p>


                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "auto", marginBottom: "20px"}}>
                        <p>Powered by <a href="https://developer.spotify.com/documentation/web-api" rel="noreferrer" style={{ color: "black" }}>Spotify's Web API</a>.</p>
                        <p>This web application is not endorsed or promoted by Spotify.</p>
                        <p >© 2023 Lukar. <a href="https://github.com/lukarh/spotiinsights" rel="noreferrer" style={{ color: "black" }}>An open source</a> React.js & Node.js Application built for fun.</p> 
                    </div>

                </div>
            
            </div>

            <div className="palm-tree-image"></div>
            <div className="birds-image"></div>

        </>
    )
}

export default Home;