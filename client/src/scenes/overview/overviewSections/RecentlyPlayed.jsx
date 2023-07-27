import { useState, useEffect } from "react";
import axios from "axios";

import Stack from "@mui/material/Stack";

import RecentCharts from "../../../components/recentlyPlayedComponents/RecentCharts";
import RecentRatings from "../../../components/recentlyPlayedComponents/RecentRatings";
import RecentPlaylist from "../../../components/recentlyPlayedComponents/RecentPlaylist";

const RecentlyPlayed = () => {
    const [recentPlaylist, setRecentPlaylist] = useState(undefined)

    useEffect(() => {
        const fetchUserSpotifyData = async () => {
            try {
                // const response = await axios.get(`/api/spotify/recently-played`, { withCredentials: true })
                const response = await axios.get(`http://localhost:5000/api/spotify/recently-played`, { withCredentials: true })
                const { items } = response.data

                setRecentPlaylist(items)

            } catch (error) {
                window.location.href = '/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [])


    return (
        (recentPlaylist)  
        ?
        <Stack>

            {/* 1ST ROW */}
            <Stack className="padding-2-rem" direction="row">
                {/* 1ST COLUMN CONTAINER OF 1ST ROW */}
                <RecentPlaylist recentPlaylist={recentPlaylist}/>

                {/* 2ND COLUMN CONTAINER OF 1ST ROW */}
                <RecentRatings recentPlaylist={recentPlaylist}/>
            </Stack>

            {/* 2ND ROW */}
            <div className="padding-2-rem">
                <RecentCharts recentPlaylist={recentPlaylist} />
            </div>

        </Stack>
        :
        <>
        </>
    )
}

export default RecentlyPlayed;