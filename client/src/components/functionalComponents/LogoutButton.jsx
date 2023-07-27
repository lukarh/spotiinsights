import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const LogoutButton = () => {
    const [errorMessage, setErrorMessage] = useState("")

    const LOGOUT_BUTTON_LABEL = "Logout"

    const handleLogout = async () => {
        try {
            const response = await axios.get(`/auth/logout`, { withCredentials: true })
			// const response = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true })

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
        <div className="flex-center padding-2-rem">
            <Button className="auth-btn" variant="contained" color="success" onClick={handleLogout}>
                {LOGOUT_BUTTON_LABEL}
            </Button>
        </div>
    )
}

export default LogoutButton;