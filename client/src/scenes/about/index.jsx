import Stack from "@mui/material/Stack";
import Contact from "../../components/AboutComponents/Contact";
import Welcome from "../../components/AboutComponents/Welcome";
import AboutInfo from "../../components/AboutComponents/AboutInfo";
import PrivacyPolicy from "../../components/AboutComponents/PrivacyPolicy";
import TwinkleStarsAnimation from "../../components/BackgroundComponents/TwinkleStarsAnimation";

const About = () => {

    return (
        <Stack className="background">
            
            {/* BACKGROUND ANIMATION */}
            <TwinkleStarsAnimation />

            <div className="flex-center" style={{ flex: 1 }}>
                <Stack className="padding-1-rem" spacing={1.5} style={{ width: "60%" }}>

                    {/* WELCOME USER SECTION */}
                    <Welcome />

                    {/* ABOUT INFO SECTION */}
                    <AboutInfo />

                    {/* CONTACT SECTION */}
                    <Contact />

                    {/* PRIVACY POLICY SECTION */}
                    <PrivacyPolicy />

                </Stack>
            </div>

        </Stack>
    )
}

export default About;