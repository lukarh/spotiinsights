import Stack from "@mui/material/Stack";

import HomeLogin from "./homeSections/HomeLogin";
import HomeFooter from "./homeSections/HomeFooter";

import TwinkleStarsAnimation from "../../components/backgroundComponents/TwinkleStarsAnimation";
import BackgroundImageOverlay from "../../components/backgroundComponents/BackgroundImageOverlay";

const Home = () => {

    return (
        <div className="background">

            <TwinkleStarsAnimation />
            <BackgroundImageOverlay />

            <Stack direction="row" className="centered-column-container">
                <HomeLogin />
                <HomeFooter />
            </Stack>
        
        </div>
    )
}

export default Home;