import axios from "axios";
import Button from "@mui/material/Button";

const LOGOUT_BUTTON_LABEL = "Logout"

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.get(`/auth/logout`, { withCredentials: true })
			// const response = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true })

            if (response.status === 200) {
                const { redirectURL } = response.data
                window.location.href = redirectURL
            } 

		} catch (error) {
            console.log(error)
		}
    }
    
    return (
        <div className="flex-center">
            <Button className="logout-btn" variant="contained" color="success" onClick={handleLogout}>
                {LOGOUT_BUTTON_LABEL}
            </Button>
        </div>
    )
}

export default LogoutButton;