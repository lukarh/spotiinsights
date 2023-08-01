import axios from "axios";
import Stack from "@mui/material/Stack";
import RecentCharts from "../../components/RecentlyPlayedComponents/RecentCharts";
import RecentRatings from "../../components/RecentlyPlayedComponents/RecentRatings";
import RecentPlaylist from "../../components/RecentlyPlayedComponents/RecentPlaylist";
import TwinkleStarsAnimation from "../../components/BackgroundComponents/TwinkleStarsAnimation";
import { useQuery } from "@tanstack/react-query";

const RecentlyPlayedOverview = () => {
    const { data, isLoading } = useQuery(["recentlyPlayed"], () => {
        return axios.get(`/api/spotify/recently-played`, { withCredentials: true }).then((res) => res.data.items)
        // return axios.get(`http://localhost:5000/api/spotify/recently-played`, { withCredentials: true }).then((res) => res.data.items)
    })

    if (isLoading) {
        return (
        <div className="flex-background">
            {/* BACKGROUND ANIMATION */}
            <TwinkleStarsAnimation />
        </div>)
    }

    return (
        <div className="flex-background">

            {/* BACKGROUND ANIMATION */}
            <TwinkleStarsAnimation />
            
            {/* RECENTLY PLAYED SECTION - OVERVIEW */}
            <Stack direction="row">

                {/* 1ST COLUMN */}
                <Stack className="padding-2-rem recent-info-container">
                    {/* 1ST ROW CONTAINER OF 1ST COLUMN */}
                    <RecentPlaylist recentPlaylist={data}/>

                    {/* 2ND ROW CONTAINER OF 1ST COLUMN */}
                    <RecentRatings recentPlaylist={data}/>
                </Stack>

                {/* 2ND COLUMN */}
                <div className="padding-2-rem recent-charts-container">
                    <RecentCharts recentPlaylist={data} />
                </div>

            </Stack>

        </div>
    )
}

export default RecentlyPlayedOverview;