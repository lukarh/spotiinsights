import TopArtistGenres from "./overviewSections/TopArtistsGenres";
import TopUserSongs from "./overviewSections/TopUserSongs";

import OverviewHeader from "./overviewSections/OverviewHeader";
import RecentlyPlayed from "./overviewSections/RecentlyPlayed";

import PrivacyPolicy from "./overviewSections/PrivacyPolicy";
import LogoutButton from "../../components/functionalComponents/LogoutButton";

import { TimeRangeProvider } from "../../contexts/TimeRangeContext";

import TwinkleStarsAnimation from "../../components/backgroundComponents/TwinkleStarsAnimation";

const Overview = () => {

    return (
        <div className="flex-background">

            {/* BACKGROUND ANIMATION */}
            <TwinkleStarsAnimation />

            {/* TOP PAGE HEADER */}
            <OverviewHeader />
            
            {/* RECENTLY PLAYED SECTION - OVERVIEW */}
            <RecentlyPlayed />

            {/* WRAP TIME RANGE CONTEXT OVER THE ARTISTS AND GENRES COMPONENTS */}
            <TimeRangeProvider>
                {/* TOP ARTISTS & GENRES SECTION - OVERVIEW */}
                <TopArtistGenres />
                {/* TOP USER SONGS SECTIONS - OVERVIEW */}
                <TopUserSongs />
            </TimeRangeProvider>

            {/* BOTTOM OF THE PAGE CONTENT */}
            <PrivacyPolicy />
            <LogoutButton />

        </div>
    )
}

export default Overview;