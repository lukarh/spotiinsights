import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";

const WELCOME_LABEL = "Welcome to Vibeify, "
const WELCOME_LABEL_END ="! 👋"

const Welcome = () => {
    const [userProfile, setUserProfile] = useState(undefined)
    const [firstName, setFirstName] = useState('')

    useEffect(() => {
        const fetchUserProfileData = async () => {
            try {
                const response = await axios.get(`/api/spotify/user-profile`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/user-profile`, { withCredentials: true })
            
                setFirstName(response.data.profile.display_name.split(' ')[0])
                setUserProfile(response.data.profile)
                
            } catch (error) {
                // window.location.href = '/home'
            }
        }

        fetchUserProfileData()        
        
    }, [])

    return (
        (userProfile) 
        ?
        <Stack className="flex-center title-welcome" spacing={1}>
            <h1 className="text-align-center">{WELCOME_LABEL}{firstName}{WELCOME_LABEL_END}</h1>
        </Stack>
        :
        <>
        </>
    )
}

export default Welcome;